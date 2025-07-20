import { NextResponse } from 'next/server';

export async function GET() {
  const mealPlans = [
    {
      id: 1,
      patient: 'John Doe',
      status: 'Active',
      startDate: '2025-07-20',
      endDate: '2025-08-20',
    },
    {
      id: 2,
      patient: 'Jane Smith',
      status: 'Inactive',
      startDate: '2025-06-15',
      endDate: '2025-07-15',
    },
  ];

  return NextResponse.json(mealPlans);
}
