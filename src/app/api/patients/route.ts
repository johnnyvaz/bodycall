import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, address, cep, about } = body;

    // Validate required fields
    if (!name?.trim()) {
      return NextResponse.json(
        { error: 'Nome é obrigatório' },
        { status: 400 }
      );
    }

    if (!email?.trim()) {
      return NextResponse.json(
        { error: 'Email é obrigatório' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email.trim())) {
      return NextResponse.json(
        { error: 'Email inválido' },
        { status: 400 }
      );
    }

    // Check if email is already in use
    const existingUser = await prisma.systemUser.findFirst({
      where: {
        email: email.trim(),
        active: 'Y'
      }
    });

    if (existingUser) {
      return NextResponse.json(
        { error: 'Este email já está sendo usado por outro usuário' },
        { status: 400 }
      );
    }

    // Get the next available ID
    const lastUser = await prisma.systemUser.findFirst({
      orderBy: {
        id: 'desc'
      }
    });

    const nextId = lastUser ? lastUser.id + 1 : 1;

    // Create new patient
    const newPatient = await prisma.systemUser.create({
      data: {
        id: nextId,
        name: name.trim(),
        email: email.trim(),
        phone: phone?.trim() || null,
        address: address?.trim() || null,
        cep: cep?.trim() || null,
        about: about?.trim() || null,
        functionName: 'Paciente',
        createdate: new Date(),
        active: 'Y',
        // Set default values for other required fields
        login: email.trim(), // Use email as login
        password: null, // Patient doesn't need password initially
        acceptedTermPolicy: null,
        acceptedTermPolicyAt: null,
        acceptedTermPolicyData: null,
        frontpageId: null,
        systemUnitId: null,
        customCode: null,
        otpSecret: null,
        photo: null,
        crn: null,
        specialization: null,
        patientLimit: null
      }
    });

    return NextResponse.json({
      message: 'Paciente criado com sucesso',
      patient: newPatient
    }, { status: 201 });

  } catch (error) {
    console.error('Erro ao criar paciente:', error);
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
    const limit = parseInt(searchParams.get('limit') || '10');
    const search = searchParams.get('search') || '';

    const skip = (page - 1) * limit;

    // Build where clause
    const where = {
      functionName: 'Paciente',
      active: 'Y',
      ...(search && {
        OR: [
          { name: { contains: search } },
          { email: { contains: search } }
        ]
      })
    };

    // Get patients with pagination
    const [patients, total] = await Promise.all([
      prisma.systemUser.findMany({
        where,
        orderBy: {
          name: 'asc'
        },
        skip,
        take: limit
      }),
      prisma.systemUser.count({ where })
    ]);

    return NextResponse.json({
      patients,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });

  } catch (error) {
    console.error('Erro ao buscar pacientes:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}