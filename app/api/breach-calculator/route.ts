import { NextRequest, NextResponse } from 'next/server';

interface BreachData {
  responses: Record<string, string>;
  dpcScore: number;
  eiScore: number;
  cbScore: number;
}

export async function POST(request: NextRequest) {
  try {
    const data: BreachData = await request.json();
    
    // Calculate final score
    const finalScore = (data.dpcScore * data.eiScore) + data.cbScore;
    
    // Determine risk level
    let riskLevel: string;
    let notifications: string[] = [];
    
    if (finalScore <= 1) {
      riskLevel = 'Low';
      notifications = ['Keep an internal record of what happened (required by GDPR Article 33)'];
    } else if (finalScore <= 2) {
      riskLevel = 'Medium';
      notifications = ['Report to your Data Protection Authority (the government office that handles privacy)'];
    } else if (finalScore <= 3) {
      riskLevel = 'High';
      notifications = ['Report to your Data Protection Authority (the government office that handles privacy)'];
    } else {
      riskLevel = 'Very High';
      notifications = [
        'Report to your Data Protection Authority (the government office that handles privacy)',
        'Notify the people whose information was involved in the breach'
      ];
    }
    
    return NextResponse.json({
      success: true,
      data: {
        finalScore,
        riskLevel,
        notifications,
        dpcScore: data.dpcScore,
        eiScore: data.eiScore,
        cbScore: data.cbScore
      }
    });
  } catch (error) {
    console.error('Error processing breach calculation:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to calculate breach risk' },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'Breach Calculator API',
    version: '1.0',
    endpoints: {
      POST: '/api/breach-calculator - Calculate breach risk score'
    }
  });
}