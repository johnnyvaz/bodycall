import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userid = searchParams.get('userid');
    const limit = searchParams.get('limit');
    const offset = searchParams.get('offset');

    const where = userid ? { userid: parseInt(userid) } : {};
    const take = limit ? parseInt(limit) : undefined;
    const skip = offset ? parseInt(offset) : undefined;

    const records = await prisma.imcCollection.findMany({
      where,
      orderBy: {
        dateimc: 'desc'
      },
      take,
      skip
    });

    return NextResponse.json(records);
  } catch (error) {
    console.error('Erro ao buscar registros IMC:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
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

    // Validate required fields
    if (!dateimc || !userid) {
      return NextResponse.json(
        { error: 'Data e usuário são obrigatórios' },
        { status: 400 }
      );
    }

    const record = await prisma.imcCollection.create({
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

    return NextResponse.json(record, { status: 201 });
  } catch (error) {
    console.error('Erro ao criar registro IMC:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}