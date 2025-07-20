import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { patientId, date, type, status, notes } = body;

    // Validate required fields
    if (!patientId) {
      return NextResponse.json(
        { error: 'ID do paciente é obrigatório' },
        { status: 400 }
      );
    }

    if (!date) {
      return NextResponse.json(
        { error: 'Data é obrigatória' },
        { status: 400 }
      );
    }

    if (!type) {
      return NextResponse.json(
        { error: 'Tipo de consulta é obrigatório' },
        { status: 400 }
      );
    }

    // Validate date format and future date
    const appointmentDate = new Date(date);
    if (isNaN(appointmentDate.getTime())) {
      return NextResponse.json(
        { error: 'Data inválida' },
        { status: 400 }
      );
    }

    if (appointmentDate <= new Date()) {
      return NextResponse.json(
        { error: 'A data deve ser futura' },
        { status: 400 }
      );
    }

    // Check if patient exists
    const existingPatient = await prisma.systemUser.findUnique({
      where: {
        id: patientId,
        functionName: 'Paciente',
        active: 'Y'
      }
    });

    if (!existingPatient) {
      return NextResponse.json(
        { error: 'Paciente não encontrado' },
        { status: 404 }
      );
    }

    // Get the next available ID
    const lastAppointment = await prisma.appointment.findFirst({
      orderBy: {
        id: 'desc'
      }
    });

    const nextId = lastAppointment ? lastAppointment.id + 1 : 1;

    // Create new appointment
    const newAppointment = await prisma.appointment.create({
      data: {
        id: nextId,
        patientId: patientId,
        nutritionistId: 1, // TODO: Get from authenticated user
        date: appointmentDate,
        type: type,
        status: status || 'agendada',
        notes: notes || null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      include: {
        patient: {
          select: {
            id: true,
            name: true,
            email: true,
            phone: true
          }
        }
      }
    });

    return NextResponse.json({
      message: 'Consulta agendada com sucesso',
      appointment: newAppointment
    }, { status: 201 });

  } catch (error) {
    console.error('Erro ao criar consulta:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '50');
    const status = searchParams.get('status');
    const patientId = searchParams.get('patientId');
    const date = searchParams.get('date');

    const skip = (page - 1) * limit;

    // Build where clause
    const where: {
      status?: string;
      patientId?: number;
      date?: {
        gte: Date;
        lte: Date;
      };
    } = {};

    if (status) {
      where.status = status;
    }

    if (patientId) {
      where.patientId = parseInt(patientId);
    }

    if (date) {
      const searchDate = new Date(date);
      const startOfDay = new Date(searchDate.getFullYear(), searchDate.getMonth(), searchDate.getDate());
      const endOfDay = new Date(searchDate.getFullYear(), searchDate.getMonth(), searchDate.getDate(), 23, 59, 59);
      
      where.date = {
        gte: startOfDay,
        lte: endOfDay
      };
    }

    // Get appointments with pagination
    const [appointments, total] = await Promise.all([
      prisma.appointment.findMany({
        where,
        orderBy: {
          date: 'asc'
        },
        skip,
        take: limit,
        include: {
          patient: {
            select: {
              id: true,
              name: true,
              email: true,
              phone: true
            }
          }
        }
      }),
      prisma.appointment.count({ where })
    ]);

    return NextResponse.json({
      appointments,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });

  } catch (error) {
    console.error('Erro ao buscar consultas:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}