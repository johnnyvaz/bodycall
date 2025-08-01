import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: idParam } = await params;
    const id = parseInt(idParam);
    
    const record = await prisma.imcCollection.findUnique({
      where: { id }
    });

    if (!record) {
      return NextResponse.json(
        { error: 'Registro não encontrado' },
        { status: 404 }
      );
    }

    return NextResponse.json(record);
  } catch (error) {
    console.error('Erro ao buscar registro IMC:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: idParam } = await params;
    const id = parseInt(idParam);
    const body = await request.json();
    
    const {
      dateimc,
      userid,
      sex,
      age,
      weight,
      height,
      neck,
      waist,
      belly,
      lowwaist,
      hip,
      pgc,
      category,
      gci,
      mgfm,
      mmlm,
      pgbmi,
      ica
    } = body;

    // Check if record exists
    const existingRecord = await prisma.imcCollection.findUnique({
      where: { id }
    });

    if (!existingRecord) {
      return NextResponse.json(
        { error: 'Registro não encontrado' },
        { status: 404 }
      );
    }

    // Validate required fields
    if (!dateimc || !userid) {
      return NextResponse.json(
        { error: 'Data e usuário são obrigatórios' },
        { status: 400 }
      );
    }

    const updatedRecord = await prisma.imcCollection.update({
      where: { id },
      data: {
        dateimc: new Date(dateimc),
        userid: parseInt(userid),
        sex,
        age: age ? parseInt(age) : null,
        weight: weight ? parseFloat(weight) : null,
        height: height ? parseInt(height) : null,
        neck: neck ? parseInt(neck) : null,
        waist: waist ? parseInt(waist) : null,
        belly: belly ? parseInt(belly) : null,
        lowwaist: lowwaist ? parseInt(lowwaist) : null,
        hip: hip ? parseInt(hip) : null,
        pgc: pgc ? parseFloat(pgc) : null,
        category,
        gci,
        mgfm: mgfm ? parseFloat(mgfm) : null,
        mmlm: mmlm ? parseFloat(mmlm) : null,
        pgbmi: pgbmi ? parseFloat(pgbmi) : null,
        ica: ica ? parseFloat(ica) : null
      }
    });

    return NextResponse.json(updatedRecord);
  } catch (error) {
    console.error('Erro ao atualizar registro IMC:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: idParam } = await params;
    const id = parseInt(idParam);
    
    // Check if record exists
    const existingRecord = await prisma.imcCollection.findUnique({
      where: { id }
    });

    if (!existingRecord) {
      return NextResponse.json(
        { error: 'Registro não encontrado' },
        { status: 404 }
      );
    }

    await prisma.imcCollection.delete({
      where: { id }
    });

    return NextResponse.json({ message: 'Registro excluído com sucesso' });
  } catch (error) {
    console.error('Erro ao excluir registro IMC:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}