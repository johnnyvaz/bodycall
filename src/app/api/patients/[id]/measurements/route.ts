import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

interface RouteParams {
  params: Promise<{
    id: string;
  }>;
}

export async function POST(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;
    const patientId = parseInt(id);
    
    if (isNaN(patientId)) {
      return NextResponse.json(
        { error: 'ID do paciente inválido' },
        { status: 400 }
      );
    }

    const body = await request.json();
    const { weight, height, age, neck, waist, hip, pgc, pgbmi } = body;

    // Validate required fields
    if (!weight || !height) {
      return NextResponse.json(
        { error: 'Peso e altura são obrigatórios' },
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

    // Create new IMC measurement
    const newMeasurement = await prisma.imcCollection.create({
      data: {
        userid: patientId,
        dateimc: new Date(),
        weight: parseFloat(weight),
        height: parseInt(height),
        age: age ? parseInt(age) : null,
        neck: neck ? parseInt(neck) : null,
        waist: waist ? parseInt(waist) : null,
        hip: hip ? parseInt(hip) : null,
        pgc: pgc ? parseFloat(pgc) : null,
        pgbmi: pgbmi ? parseFloat(pgbmi) : null,
        // These fields might be calculated or provided later
        sex: null,
        belly: null,
        lowwaist: null,
        category: null,
        gci: null,
        mgfm: null,
        mmlm: null,
        ica: null
      }
    });

    return NextResponse.json({
      message: 'Medição adicionada com sucesso',
      measurement: newMeasurement
    });

  } catch (error) {
    console.error('Erro ao adicionar medição:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;
    const patientId = parseInt(id);
    
    if (isNaN(patientId)) {
      return NextResponse.json(
        { error: 'ID do paciente inválido' },
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

    // Get all measurements for the patient
    const measurements = await prisma.imcCollection.findMany({
      where: {
        userid: patientId
      },
      orderBy: {
        dateimc: 'desc'
      }
    });

    return NextResponse.json({ measurements });

  } catch (error) {
    console.error('Erro ao buscar medições:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}