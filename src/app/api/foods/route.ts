import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const foods = await prisma.food.findMany();
    return NextResponse.json(foods);
  } catch (error) {
    console.error('Erro ao buscar alimentos:', error);
    return new NextResponse(
      JSON.stringify({ error: "Não foi possível buscar os alimentos." }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
