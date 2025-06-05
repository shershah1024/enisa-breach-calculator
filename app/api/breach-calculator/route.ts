import { NextRequest, NextResponse } from 'next/server';

interface BreachData {
  responses: Record<string, string>;
  dpcScore: number;
  eiScore: number;
  cbScore: number;
  businessSector: string;
  affectedCount: number;
  selectedDataTypes: string[];
}

export async function POST(request: NextRequest) {
  try {
    const data: BreachData = await request.json();
    
    // Calculate final score
    const finalScore = (data.dpcScore * data.eiScore) + data.cbScore;
    
    // Enhanced risk level determination based on ENISA methodology
    let riskLevel: string;
    let notifications: string[] = [];
    const hasSpecialCategories = data.selectedDataTypes.includes('sensitive');
    
    // ENISA-compliant risk assessment
    if (finalScore <= 1 && !hasSpecialCategories) {
      riskLevel = 'Low';
      notifications = ['Document the breach internally (GDPR Article 33(5))'];
    } else if (finalScore <= 2) {
      riskLevel = 'Medium';
      notifications = ['Notify Data Protection Authority within 72 hours (GDPR Article 33)'];
    } else if (finalScore <= 3) {
      riskLevel = 'High';
      notifications = [
        'Notify Data Protection Authority within 72 hours (GDPR Article 33)',
        'Consider notifying affected individuals if high risk to rights and freedoms'
      ];
    } else {
      riskLevel = 'Very High';
      notifications = [
        'Immediately notify Data Protection Authority (GDPR Article 33)',
        'Notify affected individuals without undue delay (GDPR Article 34)',
        'Prepare detailed breach documentation'
      ];
    }


    // Additional requirements for special categories
    if (hasSpecialCategories && riskLevel !== 'Low') {
      notifications.push('Enhanced documentation required for special category data');
    }
    
    return NextResponse.json({
      success: true,
      data: {
        finalScore,
        riskLevel,
        notifications,
        dpcScore: data.dpcScore,
        eiScore: data.eiScore,
        cbScore: data.cbScore,
        businessSector: data.businessSector,
        affectedCount: data.affectedCount,
        hasSpecialCategories
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