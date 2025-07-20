import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

interface RouteParams {
  params: Promise<{
    id: string;
  }>;
}

export async function PUT(request: NextRequest, { params }: RouteParams) {
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

    // Check if email is already in use by another patient
    const existingUser = await prisma.systemUser.findFirst({
      where: {
        email: email.trim(),
        id: { not: patientId },
        active: 'Y'
      }
    });

    if (existingUser) {
      return NextResponse.json(
        { error: 'Este email já está sendo usado por outro usuário' },
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

    // Update patient data
    const updatedPatient = await prisma.systemUser.update({
      where: {
        id: patientId
      },
      data: {
        name: name.trim(),
        email: email.trim(),
        phone: phone?.trim() || null,
        address: address?.trim() || null,
        cep: cep?.trim() || null,
        about: about?.trim() || null
      }
    });

    return NextResponse.json({
      message: 'Paciente atualizado com sucesso',
      patient: updatedPatient
    });

  } catch (error) {
    console.error('Erro ao atualizar paciente:', error);
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

    const patient = await prisma.systemUser.findUnique({
      where: {
        id: patientId,
        functionName: 'Paciente',
        active: 'Y'
      }
    });

    if (!patient) {
      return NextResponse.json(
        { error: 'Paciente não encontrado' },
        { status: 404 }
      );
    }

    return NextResponse.json({ patient });

  } catch (error) {
    console.error('Erro ao buscar paciente:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}