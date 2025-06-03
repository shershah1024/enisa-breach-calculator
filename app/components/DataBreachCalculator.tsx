'use client';

import React, { useState, useEffect } from 'react';
import { Shield, AlertTriangle, Calculator, Check, ChevronRight, ChevronLeft, CreditCard, User, Activity, Lock } from 'lucide-react';
import jsPDF from 'jspdf';

interface Responses {
  [key: string]: string;
}

interface Question {
  id: string;
  question: string;
  explanation: string;
  examples: string[];
  modifier?: number;
  score?: number;
  scores?: {
    [key: string]: number;
  };
}


interface DataTypeQuestions {
  [key: string]: Question[];
}

interface BreachScenario {
  confidentiality: number;
  integrity: number;
  availability: number;
}

interface ComplianceRequirement {
  authority: string;
  notification: boolean;
  individuals: boolean;
  timeline: string;
  documentation: string[];
}

const DataBreachCalculator = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [responses, setResponses] = useState<Responses>({});
  const [finalScore, setFinalScore] = useState(0);
  const [riskLevel, setRiskLevel] = useState('Low');
  const [notifications, setNotifications] = useState<string[]>([]);
  const [selectedDataTypes, setSelectedDataTypes] = useState<string[]>([]);
  const [currentDataTypeIndex, setCurrentDataTypeIndex] = useState<number>(0);
  const [breachScenario, setBreachScenario] = useState<BreachScenario>({
    confidentiality: 0,
    integrity: 0,
    availability: 0
  });
  const [businessSector, setBusinessSector] = useState<string>('');
  const [affectedCount, setAffectedCount] = useState<string>('');
  const [complianceReqs, setComplianceReqs] = useState<ComplianceRequirement | null>(null);
  const [validationMessage, setValidationMessage] = useState<string>('');

  const downloadBreachReport = () => {
    const today = new Date().toLocaleDateString();
    const sectorName = businessSectors.find(s => s.id === businessSector)?.name || 'Unknown';
    const dataTypesList = selectedDataTypes.map(id => dataTypes.find(dt => dt.id === id)?.name).filter(Boolean);

    const pdf = new jsPDF('p', 'mm', 'a4');
    const pageWidth = pdf.internal.pageSize.getWidth();
    const margin = 20;
    const lineHeight = 6;
    let yPosition = 20;

    // Helper function to add text with word wrapping
    const addText = (text: string, fontSize: number = 10, isBold: boolean = false) => {
      if (isBold) pdf.setFont('helvetica', 'bold');
      else pdf.setFont('helvetica', 'normal');
      pdf.setFontSize(fontSize);
      
      const lines = pdf.splitTextToSize(text, pageWidth - (margin * 2));
      pdf.text(lines, margin, yPosition);
      yPosition += lines.length * lineHeight;
      
      // Check if we need a new page
      if (yPosition > 270) {
        pdf.addPage();
        yPosition = 20;
      }
    };

    const addSection = (title: string) => {
      yPosition += 5;
      addText(title, 12, true);
      yPosition += 3;
      pdf.line(margin, yPosition, pageWidth - margin, yPosition);
      yPosition += 8;
    };

    const addCheckbox = (text: string, checked: boolean = false) => {
      const checkboxSize = 3;
      pdf.rect(margin, yPosition - 3, checkboxSize, checkboxSize);
      if (checked) {
        pdf.text('✓', margin + 0.5, yPosition - 0.5);
      }
      pdf.text(text, margin + checkboxSize + 2, yPosition);
      yPosition += lineHeight;
    };

    const addField = (label: string, placeholder: string = '') => {
      addText(`${label}: ${placeholder}`, 10);
      pdf.line(margin + 50, yPosition - 2, pageWidth - margin, yPosition - 2);
      yPosition += 3;
    };

    // Header
    addText('PERSONAL DATA BREACH NOTIFICATION', 16, true);
    addText('Data Protection Authority Report Template', 12);
    addText(`Generated: ${new Date().toLocaleString()}`, 10);
    yPosition += 10;

    // Section 1: Controller Details
    addSection('SECTION 1: CONTROLLER DETAILS (Article 33.3.a)');
    addField('Organization Name', '[INSERT YOUR ORGANIZATION NAME]');
    addField('Registration Number', '[INSERT REGISTRATION NUMBER]');
    addField('Address', '[INSERT COMPLETE ADDRESS]');
    addField('Phone', '[INSERT PHONE NUMBER]');
    addField('Email', '[INSERT EMAIL ADDRESS]');
    yPosition += 5;
    
    addText('Data Protection Officer (if appointed):', 10, true);
    addField('Name', '[INSERT DPO NAME]');
    addField('Phone', '[INSERT DPO PHONE]');
    addField('Email', '[INSERT DPO EMAIL]');
    yPosition += 3;
    addText(`Sector: ${sectorName}`, 10);

    // Section 2: Breach Details
    addSection('SECTION 2: BREACH DETAILS (Article 33.3.b)');
    addField('Date and time of breach discovery', '[INSERT DATE AND TIME]');
    addField('Date and time breach occurred (if different)', '[INSERT DATE AND TIME]');
    yPosition += 5;
    
    addText('Nature of the breach:', 10, true);
    addCheckbox('Confidentiality breach (unauthorized access/disclosure)', breachScenario.confidentiality > 0);
    addCheckbox('Integrity breach (unauthorized alteration)', breachScenario.integrity > 0);
    addCheckbox('Availability breach (loss of access to data)', breachScenario.availability > 0);
    yPosition += 5;
    
    addText('Description of what happened:', 10, true);
    addText('[PROVIDE DETAILED DESCRIPTION OF THE INCIDENT]', 10);

    // Section 3: Data Categories
    addSection('SECTION 3: DATA CATEGORIES (Article 33.3.c)');
    addText('Categories of personal data affected:', 10, true);
    dataTypesList.forEach(type => {
      if (type) addCheckbox(type, true);
    });
    yPosition += 5;
    
    addText('Categories of data subjects concerned:', 10, true);
    ['Employees/Staff', 'Customers/Clients', 'Patients', 'Students', 'Website users', 'Suppliers/Partners'].forEach(category => {
      addCheckbox(category);
    });
    addCheckbox('Other: [SPECIFY]');
    yPosition += 5;
    
    addText(`Approximate number of data subjects: ${affectedCount}`, 10);
    addField('Approximate number of personal data records', '[INSERT NUMBER]');
    yPosition += 3;
    
    addText('Special categories involved (Article 9 GDPR):', 10, true);
    addCheckbox('YES - Special category data was involved', selectedDataTypes.includes('sensitive'));
    addCheckbox('NO - No special category data involved', !selectedDataTypes.includes('sensitive'));

    // Section 4: Likely Consequences
    addSection('SECTION 4: LIKELY CONSEQUENCES (Article 33.3.d)');
    addText(`Risk Level Assessment: ${riskLevel}`, 10, true);
    yPosition += 3;
    
    addText('Likely consequences for individuals:', 10, true);
    ['Identity theft', 'Financial loss', 'Discrimination', 'Reputational damage', 'Physical harm', 'Loss of confidentiality'].forEach(consequence => {
      addCheckbox(consequence);
    });
    addCheckbox('Other: [SPECIFY]');
    yPosition += 5;
    addText('[DESCRIBE THE LIKELY ADVERSE CONSEQUENCES]', 10);

    // Section 5: Measures Taken
    addSection('SECTION 5: MEASURES TAKEN (Article 33.3.e)');
    addText('Measures taken to address the breach:', 10, true);
    ['Systems secured/vulnerabilities patched', 'Affected accounts secured/passwords reset', 'Additional security measures implemented', 'Third parties notified (if applicable)'].forEach(measure => {
      addCheckbox(measure);
    });
    addCheckbox('Other: [SPECIFY]');
    yPosition += 5;
    addText('[DESCRIBE ALL MEASURES TAKEN]', 10);
    yPosition += 5;
    
    addText('Measures proposed to prevent similar breaches:', 10, true);
    ['Enhanced access controls', 'Improved staff training', 'Additional encryption', 'Regular security assessments', 'Updated policies/procedures'].forEach(measure => {
      addCheckbox(measure);
    });
    addCheckbox('Other: [SPECIFY]');

    // Section 6: Notification Timeline
    addSection('SECTION 6: NOTIFICATION TIMELINE');
    addText('Notification made within 72 hours:', 10, true);
    addCheckbox('YES');
    addCheckbox('NO');
    yPosition += 3;
    addText('If NO, reasons for delay: [EXPLAIN WHY DELAYED]', 10);
    yPosition += 5;
    
    addText(`Individual notification required: ${complianceReqs?.individuals ? 'YES' : 'NO'}`, 10, true);
    yPosition += 3;
    addField('If YES, individuals will be notified by', '[DATE]');
    addText('Method of notification:', 10, true);
    ['Email', 'Letter', 'Phone', 'Website notice'].forEach(method => {
      addCheckbox(method);
    });
    addCheckbox('Other: [SPECIFY]');

    // Section 7: Additional Information
    addSection('SECTION 7: ADDITIONAL INFORMATION');
    addText('Cross-border implications:', 10, true);
    ['Data subjects in multiple EU countries affected', 'Processing activities in multiple EU countries affected', 'One-stop-shop mechanism applies'].forEach(implication => {
      addCheckbox(implication);
    });
    yPosition += 3;
    
    const isNIS2 = businessSectors.find(s => s.id === businessSector)?.nis2;
    addText('NIS2 Directive implications:', 10, true);
    addCheckbox('Organization subject to NIS2 - separate CSIRT notification required', isNIS2 || false);
    addCheckbox('Not subject to NIS2 Directive', !isNIS2);

    // Declaration
    addSection('DECLARATION');
    addText('I declare that the information provided in this notification is accurate and complete to the best of my knowledge.', 10);
    yPosition += 10;
    addField('Signature', '_________________________');
    addField('Name', '[INSERT NAME]');
    addField('Title', '[INSERT TITLE]');
    addText(`Date: ${today}`, 10);

    // Footer
    if (yPosition > 250) {
      pdf.addPage();
      yPosition = 20;
    }
    yPosition += 10;
    addText('Generated using ENISA Data Breach Risk Calculator', 8);
    addText('Compliant with GDPR Articles 33-34 and ENISA recommendations', 8);

    // Save the PDF
    pdf.save(`GDPR-breach-notification-template-${new Date().toISOString().split('T')[0]}.pdf`);
  };

  // Data types for Step 1 - Enhanced with GDPR categories
  const dataTypes = [
    {
      id: 'basic_personal',
      name: 'Basic Personal Information',
      icon: User,
      description: 'Names, addresses, contact details, basic demographics',
      examples: [
        'Names, addresses, phone numbers',
        'Email addresses',
        'Job titles, education history',
        'Family information',
        'Birth dates'
      ],
      baseScore: 1,
      gdprCategory: 'Personal Data (Art. 4(1))'
    },
    {
      id: 'behavioral',
      name: 'Behavior & Habits',
      icon: Activity,
      description: 'Information about what people do, where they go, or what they like',
      examples: [
        'GPS location history',
        'Website browsing history',
        'Shopping preferences',
        'Phone call records',
        'App usage patterns'
      ],
      baseScore: 1,
      gdprCategory: 'Personal Data (Art. 4(1))'
    },
    {
      id: 'financial',
      name: 'Financial Information',
      icon: CreditCard,
      description: 'Any information about money, spending, or financial situation',
      examples: [
        'Bank account numbers',
        'Credit card information',
        'Salary information',
        'Investment accounts',
        'Tax records'
      ],
      baseScore: 3,
      gdprCategory: 'Personal Data (Art. 4(1))'
    },
    {
      id: 'sensitive',
      name: 'Sensitive Personal Data',
      icon: Lock,
      description: 'Very private information that could harm someone if revealed',
      examples: [
        'Medical records',
        'Mental health information',
        'Sexual orientation',
        'Political opinions',
        'Religious beliefs',
        'Criminal records',
        'Biometric data',
        'Genetic data'
      ],
      baseScore: 1,
      gdprCategory: 'Special Categories (Art. 9)'
    }
  ];

  // Questions for each data type (Step 1 sub-questions)
  const dataTypeQuestions: DataTypeQuestions = {
    basic_personal: [
      {
        id: 'basic_personal_risk_level',
        question: 'What level of risk does this basic personal information present?',
        explanation: 'Consider how the information could be used and who might be affected.',
        examples: [
          'Low risk: Just names and phone numbers',
          'Medium risk: Combined info that reveals lifestyle (expensive address + car)',
          'High risk: Info that hints at sensitive matters (religious/political affiliations)',
          'Very high risk: Children involved or vulnerable individuals at risk'
        ],
        scores: {
          'low': 0.25,
          'medium': 0.5,
          'high': 0.75,
          'very_high': 1.0
        }
      }
    ],
    behavioral: [
      {
        id: 'behavioral_risk_level',
        question: 'What level of risk does this behavioral data present?',
        explanation: 'Consider how detailed the behavioral patterns are and what they might reveal.',
        examples: [
          'Low risk: Limited behavioral data (single location visit)',
          'Medium risk: General patterns (shopping habits, basic location data)',
          'High risk: Detailed life patterns (complete daily tracking, all purchases)',
          'Very high risk: Reveals health/relationships (medical visits, dating patterns)'
        ],
        scores: {
          'low': 0.25,
          'medium': 0.5,
          'high': 0.75,
          'very_high': 1.0
        }
      }
    ],
    financial: [
      {
        id: 'financial_risk_level',
        question: 'What level of financial information was exposed?',
        explanation: 'Consider how much financial detail was revealed and its potential for misuse.',
        examples: [
          'Low risk: Minimal info (just knowing where someone banks)',
          'Medium risk: Partial info (last 4 digits, expired cards)',
          'High risk: Significant info but incomplete (account without routing)',
          'Very high risk: Complete info enabling fraud (full card details, banking credentials)'
        ],
        scores: {
          'low': 0.25,
          'medium': 0.5,
          'high': 0.75,
          'very_high': 1.0
        }
      }
    ],
    sensitive: [
      {
        id: 'sensitive_risk_level',
        question: 'What level of sensitive personal data was exposed?',
        explanation: 'Consider how specific and potentially harmful the sensitive information is.',
        examples: [
          'Low risk: General hints only (visited hospital, attended service)',
          'Medium risk: Some specific details but limited scope',
          'High risk: Detailed sensitive information (medical conditions, beliefs)',
          'Very high risk: Highly specific private details (therapy notes, genetic data)'
        ],
        scores: {
          'low': 0.25,
          'medium': 0.5,
          'high': 0.75,
          'very_high': 1.0
        }
      }
    ]
  };

  // Increasing and Decreasing Factors (Step 2)
  const modifyingFactors = {
    increasing: [
      {
        id: 'volume_factor',
        question: 'Was there a lot of information about the same person, or information collected over a long time?',
        explanation: 'More information about someone makes the breach worse.',
        examples: [
          '✓ 5 years of email history',
          '✓ Complete customer profile with multiple data types',
          '✗ Just one email'
        ],
        score: 1
      },
      {
        id: 'controller_characteristics',
        question: 'Does the type of business make this information more sensitive?',
        explanation: 'Some businesses handle information that reveals more about people.',
        examples: [
          '✓ Customer list from a fertility clinic',
          '✓ Customer list from an addiction center',
          '✗ Customer list from a grocery store'
        ],
        score: 1
      },
      {
        id: 'individual_characteristics',
        question: 'Are the people affected famous, important, or need special protection?',
        explanation: 'Some people face greater risks if their information is exposed.',
        examples: [
          '✓ Children under 18',
          '✓ Government officials',
          '✓ Celebrities',
          '✗ General adult customers'
        ],
        score: 1
      }
    ],
    decreasing: [
      {
        id: 'data_invalidity',
        question: 'Is the leaked information old, wrong, or inaccurate?',
        explanation: 'If the information is wrong or outdated, it\'s less harmful.',
        examples: [
          '✓ Address list where most people have moved',
          '✓ Disconnected phone numbers',
          '✗ Current and accurate information'
        ],
        score: -1
      },
      {
        id: 'public_availability',
        question: 'Was this information already publicly available?',
        explanation: 'If people could already find this information, the breach is less serious.',
        examples: [
          '✓ Information on public websites',
          '✓ Phone book listings',
          '✗ Private customer databases'
        ],
        score: -1
      },
      {
        id: 'data_nature',
        question: 'Even though this seems sensitive, is it actually harmless?',
        explanation: 'Sometimes information looks sensitive but doesn\'t reveal anything harmful.',
        examples: [
          '✓ Medical certificate just saying "healthy"',
          '✓ Background check showing "no record"',
          '✗ Medical records with diseases'
        ],
        score: -1
      }
    ]
  };

  // Ease of Identification Questions (Step 3)
  const eiQuestions = [
    {
      id: 'ease_of_identification',
      question: 'How easy is it to identify individuals from the exposed data?',
      explanation: 'Select the option that best describes how identifiable the individuals are.',
      examples: [
        'Very difficult: Random IDs, coded emails (user12345@company.com)',
        'Moderately difficult: Anonymous usernames but searchable online',
        'Somewhat easy: Full names in small communities or unique names',
        'Very easy: Real names in emails, primary identifiers used everywhere'
      ],
      scores: {
        'very_difficult': 0.25,
        'moderately_difficult': 0.5,
        'somewhat_easy': 0.75,
        'very_easy': 1.0
      }
    }
  ];

  // Circumstances of Breach Questions (Step 4)
  const cbQuestions = [
    {
      id: 'cb_confidentiality',
      category: 'Information Got Out',
      questions: [
        {
          id: 'cb_confidentiality',
          question: 'How was the information exposed?',
          explanation: 'Choose the option that best describes how confidentiality was affected.',
          examples: [
            'Lost/discarded: Laptop lost during shipping, papers in trash',
            'Shared with known parties: Email sent to wrong group',
            'Public exposure: Data posted online, published by hackers'
          ],
          scores: {
            lost: 0,
            known: 0.25,
            public: 0.5
          }
        }
      ]
    },
    {
      id: 'cb_integrity',
      category: 'Information Was Changed',
      questions: [
        {
          id: 'cb_integrity',
          question: 'What happened to the information integrity?',
          explanation: 'Choose the option that best describes how data integrity was affected.',
          examples: [
            'Fixed quickly: Database changed but restored before use',
            'Used but fixable: Medical records changed, patient needs new appointment',
            'Permanently altered: Database corrupted with no backup'
          ],
          scores: {
            fixed: 0,
            fixable: 0.25,
            permanent: 0.5
          }
        }
      ]
    },
    {
      id: 'cb_availability',
      category: 'Information Became Unavailable',
      questions: [
        {
          id: 'cb_availability',
          question: 'What happened to the information availability?',
          explanation: 'Choose the option that best describes the availability impact.',
          examples: [
            'Easily recoverable: One copy lost but others available',
            'Recoverable with work: Database needs rebuilding',
            'Completely lost: No backups and original destroyed'
          ],
          scores: {
            recoverable: 0,
            temporal: 0.25,
            permanent: 0.5
          }
        }
      ]
    },
    {
      id: 'cb_malicious',
      category: 'Intentional Harm',
      questions: [
        {
          id: 'cb_malicious_intent',
          question: 'Did someone intentionally cause this breach to harm people?',
          explanation: 'This wasn\'t an accident - someone did it on purpose.',
          examples: [
            '✓ Employee leaked data to harm company',
            '✓ Hacker stole and published data',
            '✗ Accidental email to wrong person'
          ],
          score: 0.5
        }
      ]
    }
  ];

  // Business sectors (for NIS2 and sector-specific guidance)
  const businessSectors = [
    { id: 'healthcare', name: 'Healthcare', nis2: true, critical: true },
    { id: 'finance', name: 'Banking & Finance', nis2: true, critical: true },
    { id: 'energy', name: 'Energy', nis2: true, critical: true },
    { id: 'transport', name: 'Transport', nis2: true, critical: true },
    { id: 'digital_infra', name: 'Digital Infrastructure', nis2: true, critical: true },
    { id: 'water', name: 'Water Supply', nis2: true, critical: true },
    { id: 'manufacturing', name: 'Manufacturing', nis2: true, critical: false },
    { id: 'retail', name: 'Retail & E-commerce', nis2: false, critical: false },
    { id: 'education', name: 'Education', nis2: false, critical: false },
    { id: 'public_admin', name: 'Public Administration', nis2: true, critical: true },
    { id: 'other', name: 'Other', nis2: false, critical: false }
  ];

  const steps = [
    { title: 'Sector & Scale', description: 'Your organization and breach size' },
    { title: 'Data Selection', description: 'Select types of data involved' },
    { title: 'Data Details', description: 'Answer questions about selected data' },
    { title: 'Risk Factors', description: 'What increases or decreases the risk?' },
    { title: 'Identification', description: 'How easy is it to identify people?' },
    { title: 'Breach Details', description: 'What happened during the breach?' },
    { title: 'Results', description: 'Your risk assessment and required actions' }
  ];

  const handleResponse = (questionId: string, value: string) => {
    setResponses(prev => ({
      ...prev,
      [questionId]: value
    }));
  };


  const toggleDataType = (typeId: string) => {
    setSelectedDataTypes(prev => {
      if (prev.includes(typeId)) {
        return prev.filter(id => id !== typeId);
      } else {
        return [...prev, typeId];
      }
    });
  };

  const calculateScores = () => {
    let dpc = 0;
    let ei = 0.25; // Default minimum
    let cb = 0;
    let confidentiality = 0;
    let integrity = 0;
    let availability = 0;

    // Calculate DPC Score from selected data types and their questions
    selectedDataTypes.forEach(typeId => {
      const dataType = dataTypes.find(dt => dt.id === typeId);
      if (dataType) {
        dpc += dataType.baseScore;

        // Apply ENISA base scoring adjustments
        if (dataType.id === 'sensitive') {
          dpc += 3; // Sensitive data gets significant base increase per ENISA
        }
        
        // Add sector-specific modifiers
        if (businessSector === 'healthcare' && dataType.id === 'sensitive') {
          dpc += 1; // Healthcare breaches with medical data are more severe
        }
        if (businessSector === 'finance' && dataType.id === 'financial') {
          dpc += 1; // Financial sector breaches with financial data are critical
        }

        // Add contextual adjustments from data type specific questions
        const questions = dataTypeQuestions[typeId] || [];
        questions.forEach(q => {
          if ('scores' in q && q.scores && typeof q.scores === 'object') {
            const selectedOption = responses[q.id];
            if (selectedOption && selectedOption in q.scores) {
              const scoreValue = q.scores[selectedOption as keyof typeof q.scores];
              // Convert matrix score to contextual adjustment: 0.25=0, 0.5=1, 0.75=2, 1.0=3
              const adjustment = Math.round((scoreValue - 0.25) / 0.25);
              dpc += adjustment;
            }
          } else if ('modifier' in q && q.modifier && responses[q.id] === 'yes') {
            dpc += q.modifier;
          }
        });
      }
    });

    // Add scale modifier based on affected individuals
    const count = parseInt(affectedCount) || 0;
    if (count > 100000) dpc += 2;
    else if (count > 10000) dpc += 1;
    else if (count > 1000) dpc += 0.5;

    // Add increasing/decreasing factors
    modifyingFactors.increasing.forEach(q => {
      if (responses[q.id] === 'yes') {
        dpc += q.score;
      }
    });
    modifyingFactors.decreasing.forEach(q => {
      if (responses[q.id] === 'yes') {
        dpc += q.score;
      }
    });

    // Ensure DPC doesn't go below 0
    dpc = Math.max(0, dpc);

    // Calculate EI Score
    eiQuestions.forEach(q => {
      if ('scores' in q && q.scores && typeof q.scores === 'object') {
        const selectedOption = responses[q.id];
        if (selectedOption && selectedOption in q.scores) {
          ei = q.scores[selectedOption as keyof typeof q.scores];
        }
      } else if ('score' in q && q.score !== undefined && responses[q.id] === 'yes') {
        ei = q.score;
      }
    });

    // Calculate CB Score and CIA triad
    cbQuestions.forEach(category => {
      category.questions.forEach(q => {
        if ('scores' in q && q.scores && typeof q.scores === 'object') {
          // Handle multi-choice questions (like availability)
          const selectedOption = responses[q.id];
          if (selectedOption && selectedOption in q.scores) {
            const scoreValue = q.scores[selectedOption as keyof typeof q.scores];
            cb += scoreValue;
            
            // Track CIA triad  
            if (category.id === 'cb_availability') {
              availability = Math.max(availability, scoreValue);
            } else if (category.id === 'cb_confidentiality') {
              confidentiality = Math.max(confidentiality, scoreValue);
            } else if (category.id === 'cb_integrity') {
              integrity = Math.max(integrity, scoreValue);
            }
          }
        } else if ('score' in q && responses[q.id] === 'yes') {
          // Handle yes/no questions
          cb += q.score || 0;
          
          // Track CIA triad
          if (category.id === 'cb_confidentiality') {
            confidentiality = Math.max(confidentiality, q.score || 0);
          } else if (category.id === 'cb_integrity') {
            integrity = Math.max(integrity, q.score || 0);
          }
        }
      });
    });

    setBreachScenario({ confidentiality, integrity, availability });

    const final = (dpc * ei) + cb;

    setFinalScore(final);

    // Determine risk level and notifications based on ENISA methodology
    let risk, actions = [];
    const hasSpecialCategories = selectedDataTypes.includes('sensitive');
    const isNIS2Sector = businessSectors.find(s => s.id === businessSector)?.nis2 || false;
    
    // Enhanced risk assessment considering multiple factors
    if (final <= 1 && !hasSpecialCategories) {
      risk = 'Low';
      actions = ['Document the breach internally (GDPR Article 33(5))'];
    } else if (final <= 2) {
      risk = 'Medium';
      actions = ['Notify Data Protection Authority within 72 hours (GDPR Article 33)'];
    } else if (final <= 3) {
      risk = 'High';
      actions = [
        'Notify Data Protection Authority within 72 hours (GDPR Article 33)',
        'Consider notifying affected individuals if high risk to rights and freedoms'
      ];
    } else {
      risk = 'Very High';
      actions = [
        'Immediately notify Data Protection Authority (GDPR Article 33)',
        'Notify affected individuals without undue delay (GDPR Article 34)',
        'Prepare detailed breach documentation'
      ];
    }

    // Add NIS2 requirements if applicable
    if (isNIS2Sector && (risk === 'High' || risk === 'Very High')) {
      actions.push('Report to national CSIRT/competent authority (NIS2 Directive)');
    }

    // Set compliance requirements
    setComplianceReqs({
      authority: 'Data Protection Authority',
      notification: risk !== 'Low',
      individuals: risk === 'Very High' || (risk === 'High' && hasSpecialCategories),
      timeline: risk === 'Low' ? 'No notification required' : '72 hours',
      documentation: [
        'Nature of the personal data breach',
        'Categories and approximate number of data subjects',
        'Categories and approximate number of personal data records',
        'Name and contact details of DPO',
        'Likely consequences of the breach',
        'Measures taken or proposed to address the breach'
      ]
    });

    setRiskLevel(risk);
    setNotifications(actions);
  };

  useEffect(() => {
    calculateScores();
  }, [responses, selectedDataTypes]);

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'Low': return 'text-green-700 bg-green-100 border-green-300';
      case 'Medium': return 'text-yellow-700 bg-yellow-100 border-yellow-300';
      case 'High': return 'text-orange-700 bg-orange-100 border-orange-300';
      case 'Very High': return 'text-red-700 bg-red-100 border-red-300';
      default: return 'text-gray-700 bg-gray-100 border-gray-300';
    }
  };

  const getValidationInfo = () => {
    let canProceed = false;
    let message = '';
    
    switch (currentStep) {
      case 0: // Sector & Scale
        if (businessSector === '' && affectedCount === '') {
          message = 'Please select your business sector and the number of people affected.';
        } else if (businessSector === '') {
          message = 'Please select your business sector.';
        } else if (affectedCount === '') {
          message = 'Please select how many people are affected.';
        } else {
          canProceed = true;
        }
        break;
      case 1: // Data Selection
        if (selectedDataTypes.length === 0) {
          message = 'Please select at least one type of data that was involved in the breach.';
        } else {
          canProceed = true;
        }
        break;
      case 2: // Data Details (individual data type questions)
        if (selectedDataTypes.length === 0) {
          canProceed = true;
        } else {
          const currentDataType = selectedDataTypes[currentDataTypeIndex];
          const dataTypeName = dataTypes.find(dt => dt.id === currentDataType)?.name || 'this data type';
          const questions = dataTypeQuestions[currentDataType] || [];
          if (questions.length === 0) {
            canProceed = true;
          } else {
            const unansweredQuestions = questions.filter(q => responses[q.id] === undefined);
            if (unansweredQuestions.length > 0) {
              message = `Please answer the question about ${dataTypeName} to continue.`;
            } else {
              canProceed = true;
            }
          }
        }
        break;
      case 3: // Risk Factors
        canProceed = true; // Optional step
        break;
      case 4: // Identification (EI Questions)
        const hasAnsweredEI = eiQuestions.some(q => responses[q.id] !== undefined);
        if (!hasAnsweredEI) {
          message = 'Please select one option that best describes how easy it is to identify people from the data.';
        } else {
          canProceed = true;
        }
        break;
      case 5: // Breach Details (CB Questions)
        canProceed = true; // Optional step
        break;
      case 6: // Results
        canProceed = true;
        break;
      default: 
        canProceed = true;
    }
    
    return { canProceed, message };
  };

  const canProceed = () => {
    const { canProceed: result } = getValidationInfo();
    return result;
  };
  
  // Update validation message when relevant state changes
  useEffect(() => {
    const { message } = getValidationInfo();
    setValidationMessage(message);
  }, [currentStep, businessSector, affectedCount, selectedDataTypes, currentDataTypeIndex, responses]);

  const nextStep = () => {
    if (currentStep === 2) { // Data Details step
      if (currentDataTypeIndex < selectedDataTypes.length - 1) {
        // Move to next data type
        setCurrentDataTypeIndex(currentDataTypeIndex + 1);
        setValidationMessage(''); // Clear any validation message
      } else {
        // Move to next step
        setCurrentStep(currentStep + 1);
        setCurrentDataTypeIndex(0); // Reset for potential future use
        setValidationMessage(''); // Clear any validation message
      }
    } else if (currentStep < steps.length - 1 && canProceed()) {
      if (currentStep === 1) {
        // Moving from Data Selection to Data Details - reset index
        setCurrentDataTypeIndex(0);
      }
      setCurrentStep(currentStep + 1);
      setValidationMessage(''); // Clear any validation message
    }
    // If canProceed() is false, the validation message will be shown automatically
  };

  const prevStep = () => {
    setValidationMessage(''); // Clear any validation message
    
    if (currentStep === 2) { // Data Details step
      if (currentDataTypeIndex > 0) {
        // Move to previous data type
        setCurrentDataTypeIndex(currentDataTypeIndex - 1);
      } else {
        // Move to previous step
        setCurrentStep(currentStep - 1);
      }
    } else if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const MultiChoiceCard = ({ question }: { question: Question }) => (
    <div className="bg-white border border-gray-200 rounded-lg p-4 mb-4">
      <div className="mb-3">
        <h4 className="font-medium text-gray-900 mb-2">{question.question}</h4>
        <p className="text-sm text-gray-600 mb-3">{question.explanation}</p>
        
        <div className="p-3 bg-gray-50 rounded-lg">
          <h5 className="font-medium text-gray-700 mb-2 text-sm">Options:</h5>
          <ul className="text-sm space-y-1">
            {question.examples.map((example: string, index: number) => (
              <li key={index} className="text-gray-700">• {example}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="space-y-3">
        {question.scores && Object.entries(question.scores).map(([key, _]) => {
          const getOptionLabel = (questionId: string, optionKey: string) => {
            if (questionId === 'cb_availability') {
              return {
                recoverable: 'Easily recoverable (no impact)',
                temporal: 'Recoverable with work (low impact)', 
                permanent: 'Completely lost forever (high impact)'
              }[optionKey] || optionKey;
            } else if (questionId === 'cb_confidentiality') {
              return {
                lost: 'Lost or discarded (no confirmed access)',
                known: 'Shared with known parties (limited exposure)',
                public: 'Public or unknown exposure (wide access)'
              }[optionKey] || optionKey;
            } else if (questionId === 'cb_integrity') {
              return {
                fixed: 'Fixed before use (no impact)',
                fixable: 'Used but can be corrected (temporary impact)',
                permanent: 'Permanently altered (irreversible)'
              }[optionKey] || optionKey;
            } else if (questionId === 'ease_of_identification') {
              return {
                very_difficult: 'Very difficult to identify (0.25)',
                moderately_difficult: 'Moderately difficult to identify (0.5)',
                somewhat_easy: 'Somewhat easy to identify (0.75)',
                very_easy: 'Very easy to identify (1.0)'
              }[optionKey] || optionKey;
            } else if (questionId.endsWith('_risk_level')) {
              return {
                low: 'Low risk (0.25)',
                medium: 'Medium risk (0.5)',
                high: 'High risk (0.75)',
                very_high: 'Very high risk (1.0)'
              }[optionKey] || optionKey;
            }
            return optionKey;
          };

          return (
            <label key={key} className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name={question.id}
                value={key}
                checked={responses[question.id] === key}
                onChange={() => handleResponse(question.id, key)}
                className="text-blue-600"
              />
              <span className="text-gray-700">
                {getOptionLabel(question.id, key)}
              </span>
            </label>
          );
        })}
      </div>
    </div>
  );

  const QuestionCard = ({ question }: { question: Question }) => (
    <div className="bg-white border border-gray-200 rounded-lg p-4 mb-4">
      <div className="mb-3">
        <h4 className="font-medium text-gray-900 mb-2">{question.question}</h4>
        <p className="text-sm text-gray-600 mb-3">{question.explanation}</p>
        
        <div className="p-3 bg-gray-50 rounded-lg">
          <h5 className="font-medium text-gray-700 mb-2 text-sm">Examples:</h5>
          <ul className="text-sm space-y-1">
            {question.examples.map((example: string, index: number) => (
              <li key={index} className={example.startsWith('✓') ? 'text-green-700' : 'text-red-700'}>
                {example}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="flex gap-6">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            name={question.id}
            value="yes"
            checked={responses[question.id] === 'yes'}
            onChange={() => handleResponse(question.id, 'yes')}
            className="text-green-600"
          />
          <span className="text-green-700 font-medium">Yes</span>
        </label>
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            name={question.id}
            value="no"
            checked={responses[question.id] === 'no'}
            onChange={() => handleResponse(question.id, 'no')}
            className="text-red-600"
          />
          <span className="text-red-700 font-medium">No</span>
        </label>
      </div>
    </div>
  );


  const renderStep = () => {
    switch (currentStep) {
      case 0: // Sector & Scale
        return (
          <div>
            <h2 className="text-2xl font-semibold mb-6">Tell us about your organization and the breach</h2>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <p className="text-blue-800">
                <strong>Why this matters:</strong> Different sectors have specific regulatory requirements under GDPR and NIS2 Directive. The scale of the breach also affects notification requirements.
              </p>
            </div>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  What sector is your organization in?
                </label>
                <select
                  value={businessSector}
                  onChange={(e) => setBusinessSector(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select your sector...</option>
                  {businessSectors.map(sector => (
                    <option key={sector.id} value={sector.id}>
                      {sector.name} {sector.nis2 && '(NIS2 Regulated)'}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Approximately how many people are affected?
                </label>
                <select
                  value={affectedCount}
                  onChange={(e) => setAffectedCount(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select range...</option>
                  <option value="1">1-10 individuals</option>
                  <option value="50">11-100 individuals</option>
                  <option value="500">101-1,000 individuals</option>
                  <option value="5000">1,001-10,000 individuals</option>
                  <option value="50000">10,001-100,000 individuals</option>
                  <option value="500000">More than 100,000 individuals</option>
                </select>
              </div>

              {businessSector && businessSectors.find(s => s.id === businessSector)?.nis2 && (
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                  <h3 className="font-semibold text-amber-900 mb-2">NIS2 Directive Applies</h3>
                  <p className="text-amber-800 text-sm">
                    Your sector is covered by the NIS2 Directive (effective January 2023). This means you have additional cybersecurity obligations and may need to report significant incidents to both data protection and cybersecurity authorities.
                  </p>
                </div>
              )}
            </div>
          </div>
        );
        
      case 1: // Data Selection
        return (
          <div>
            <h2 className="text-2xl font-semibold mb-6">What types of information were involved in the breach?</h2>
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
              <p className="text-amber-800">
                <strong>Important:</strong> Select ALL types of data that were part of the breach. Most breaches involve multiple types of information. You'll answer detailed questions about each type next.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              {dataTypes.map(dataType => (
                <div 
                  key={dataType.id}
                  onClick={() => toggleDataType(dataType.id)}
                  className={`border-2 rounded-lg p-6 transition-all cursor-pointer ${
                    selectedDataTypes.includes(dataType.id) 
                      ? 'border-blue-500 bg-blue-50' 
                      : 'border-gray-200 bg-white hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <dataType.icon size={24} className={selectedDataTypes.includes(dataType.id) ? 'text-blue-600' : 'text-gray-600'} />
                      <h3 className="font-semibold text-lg">{dataType.name}</h3>
                    </div>
                    <div className={`w-6 h-6 rounded border-2 ${
                      selectedDataTypes.includes(dataType.id) ? 'bg-blue-500 border-blue-500' : 'border-gray-300 bg-white'
                    } flex items-center justify-center`}>
                      {selectedDataTypes.includes(dataType.id) && <Check size={16} className="text-white" />}
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">{dataType.description}</p>
                  <div className="text-sm text-gray-500">
                    <strong>Examples:</strong>
                    <ul className="mt-1 space-y-1">
                      {dataType.examples.slice(0, 3).map((example: string, idx: number) => (
                        <li key={idx}>• {example}</li>
                      ))}
                    </ul>
                    {dataType.gdprCategory && (
                      <div className="mt-2 text-xs text-blue-600">
                        {dataType.gdprCategory}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6">
              <div className="text-center">
                <p className="text-sm text-gray-600">
                  Selected: {selectedDataTypes.length} type{selectedDataTypes.length !== 1 ? 's' : ''} of data
                </p>
              </div>
              
              {selectedDataTypes.includes('sensitive') && (
                <div className="mt-4 bg-red-50 border border-red-200 rounded-lg p-4">
                  <h4 className="font-semibold text-red-900 mb-2">Special Category Data Detected</h4>
                  <p className="text-red-800 text-sm">
                    You've selected sensitive personal data (GDPR Article 9). This includes health data, biometric data, political opinions, religious beliefs, etc. Breaches involving special categories require enhanced protection measures and may have stricter notification requirements.
                  </p>
                </div>
              )}
            </div>
          </div>
        );

      case 2: // Data Details
        if (selectedDataTypes.length === 0) {
          return (
            <div className="text-center py-8">
              <p className="text-gray-600">Please go back and select at least one data type first.</p>
            </div>
          );
        }
        
        const currentDataType = dataTypes.find(dt => dt.id === selectedDataTypes[currentDataTypeIndex]);
        const questions = dataTypeQuestions[selectedDataTypes[currentDataTypeIndex]] || [];
        
        if (!currentDataType) return null;
        
        return (
          <div>
            <div className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-semibold">Questions about {currentDataType.name}</h2>
                <div className="text-sm text-gray-500">
                  Data type {currentDataTypeIndex + 1} of {selectedDataTypes.length}
                </div>
              </div>
              
              {/* Progress bar for data types */}
              <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                <div 
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${((currentDataTypeIndex + 1) / selectedDataTypes.length) * 100}%` }}
                ></div>
              </div>
              
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                <div className="flex items-center gap-3 mb-2">
                  <currentDataType.icon size={20} className="text-blue-600" />
                  <h3 className="font-semibold text-blue-900">{currentDataType.name}</h3>
                </div>
                <p className="text-blue-800 text-sm">{currentDataType.description}</p>
                {currentDataType.gdprCategory && (
                  <div className="mt-2 text-xs text-blue-700">
                    {currentDataType.gdprCategory}
                  </div>
                )}
              </div>
            </div>
            
            {questions.length > 0 ? (
              <div>
                <p className="text-gray-600 mb-6">
                  Answer this question to help us better assess the risk for this type of data.
                </p>
                {questions.map((q: Question) => (
                  'scores' in q && q.scores && typeof q.scores === 'object' ? 
                    <MultiChoiceCard key={q.id} question={q} /> :
                    <QuestionCard key={q.id} question={q} />
                ))}
              </div>
            ) : (
              <div className="text-center py-8 bg-gray-50 rounded-lg">
                <p className="text-gray-600">No additional questions for this data type.</p>
                <p className="text-sm text-gray-500 mt-2">Click Next to continue to the next data type.</p>
              </div>
            )}
          </div>
        );

      case 3: // Risk Factors
        return (
          <div>
            <h2 className="text-2xl font-semibold mb-6">What factors might increase or decrease the risk?</h2>
            <p className="text-gray-600 mb-8">These factors can make the breach more or less serious.</p>
            
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <AlertTriangle size={20} className="text-orange-600" />
                Factors that INCREASE risk
              </h3>
              <div className="bg-orange-50 rounded-lg p-4">
                {modifyingFactors.increasing.map(factor => (
                  <QuestionCard key={factor.id} question={factor} />
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Shield size={20} className="text-green-600" />
                Factors that DECREASE risk
              </h3>
              <div className="bg-green-50 rounded-lg p-4">
                {modifyingFactors.decreasing.map(factor => (
                  <QuestionCard key={factor.id} question={factor} />
                ))}
              </div>
            </div>
          </div>
        );

      case 4: // Ease of Identification
        return (
          <div>
            <h2 className="text-2xl font-semibold mb-6">How easy is it to identify the people involved?</h2>
            <p className="text-gray-600 mb-8">Choose the option that best describes your situation. Only select one.</p>
            <div className="bg-gray-50 rounded-lg p-6">
              {eiQuestions.map(q => (
                'scores' in q && q.scores && typeof q.scores === 'object' ? 
                  <MultiChoiceCard key={q.id} question={q} /> :
                  <QuestionCard key={q.id} question={q} />
              ))}
            </div>
          </div>
        );

      case 5: // Circumstances of Breach
        return (
          <div>
            <h2 className="text-2xl font-semibold mb-6">What happened during the breach?</h2>
            <p className="text-gray-600 mb-8">Select all situations that apply to your breach.</p>
            {cbQuestions.map(category => (
              <div key={category.id} className="mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">{category.category}</h3>
                <div className="bg-gray-50 rounded-lg p-4">
                  {category.questions.map(q => (
                    'scores' in q && q.scores && typeof q.scores === 'object' ? 
                      <MultiChoiceCard key={q.id} question={q} /> :
                      <QuestionCard key={q.id} question={q} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        );

      case 6: // Results
        return (
          <div>
            <div className="bg-white rounded-lg shadow-lg border-2 border-gray-200 p-6 mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Calculator size={24} />
                Your Risk Assessment Results
              </h2>
              
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                <div className="text-center mb-4">
                  <h3 className="text-lg font-semibold text-blue-900 mb-2">ENISA Score Calculation</h3>
                  <p className="text-blue-800 text-sm mb-3">SE = DPC × EI + CB</p>
                  <div className="text-2xl font-bold text-blue-900">
                    Final Score: {finalScore.toFixed(2)}
                  </div>
                </div>
                
                {/* Score Breakdown */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div className="bg-white rounded-lg p-3 text-center">
                    <div className="font-semibold text-blue-900">DPC</div>
                    <div className="text-lg font-bold text-blue-800">
                      {(() => {
                        let dpc = 0;
                        selectedDataTypes.forEach(typeId => {
                          const dataType = dataTypes.find(dt => dt.id === typeId);
                          if (dataType) {
                            dpc += dataType.baseScore;
                            if (dataType.id === 'sensitive') dpc += 3;
                            if (businessSector === 'healthcare' && dataType.id === 'sensitive') dpc += 1;
                            if (businessSector === 'finance' && dataType.id === 'financial') dpc += 1;
                            const questions = dataTypeQuestions[typeId] || [];
                            questions.forEach(q => {
                              if ('scores' in q && q.scores && typeof q.scores === 'object') {
                                const selectedOption = responses[q.id];
                                if (selectedOption && selectedOption in q.scores) {
                                  const scoreValue = q.scores[selectedOption as keyof typeof q.scores];
                                  const adjustment = Math.round((scoreValue - 0.25) / 0.25);
                                  dpc += adjustment;
                                }
                              }
                            });
                          }
                        });
                        const count = parseInt(affectedCount) || 0;
                        if (count > 100000) dpc += 2;
                        else if (count > 10000) dpc += 1;
                        else if (count > 1000) dpc += 0.5;
                        modifyingFactors.increasing.forEach(q => {
                          if (responses[q.id] === 'yes') dpc += q.score;
                        });
                        modifyingFactors.decreasing.forEach(q => {
                          if (responses[q.id] === 'yes') dpc += q.score;
                        });
                        return Math.max(0, dpc).toFixed(1);
                      })()}
                    </div>
                    <div className="text-xs text-blue-700">Data Processing Context</div>
                  </div>
                  
                  <div className="bg-white rounded-lg p-3 text-center">
                    <div className="font-semibold text-blue-900">EI</div>
                    <div className="text-lg font-bold text-blue-800">
                      {(() => {
                        let ei = 0.25;
                        eiQuestions.forEach(q => {
                          if ('scores' in q && q.scores && typeof q.scores === 'object') {
                            const selectedOption = responses[q.id];
                            if (selectedOption && selectedOption in q.scores) {
                              ei = q.scores[selectedOption as keyof typeof q.scores];
                            }
                          }
                        });
                        return ei.toFixed(2);
                      })()}
                    </div>
                    <div className="text-xs text-blue-700">Ease of Identification</div>
                  </div>
                  
                  <div className="bg-white rounded-lg p-3 text-center">
                    <div className="font-semibold text-blue-900">CB</div>
                    <div className="text-lg font-bold text-blue-800">
                      {(() => {
                        let cb = 0;
                        cbQuestions.forEach(category => {
                          category.questions.forEach(q => {
                            if ('scores' in q && q.scores && typeof q.scores === 'object') {
                              const selectedOption = responses[q.id];
                              if (selectedOption && selectedOption in q.scores) {
                                cb += q.scores[selectedOption as keyof typeof q.scores];
                              }
                            } else if ('score' in q && responses[q.id] === 'yes') {
                              cb += q.score || 0;
                            }
                          });
                        });
                        return cb.toFixed(2);
                      })()}
                    </div>
                    <div className="text-xs text-blue-700">Circumstances of Breach</div>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-center mb-6">
                <span className={`px-6 py-3 rounded-lg font-bold text-lg border-2 ${getRiskColor(riskLevel)}`}>
                  Risk Level: {riskLevel}
                </span>
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-3">What you need to do:</h3>
                <ul className="space-y-3">
                  {notifications.map((action, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <Check size={20} className="text-green-600 mt-1 flex-shrink-0" />
                      <span className="text-gray-700 text-lg">{action}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Understanding Your Risk Level</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                <div className="space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
                    <span className="px-3 py-2 bg-green-100 text-green-700 border border-green-300 rounded font-medium text-center text-sm">
                      Low Risk (0-1)
                    </span>
                    <span className="text-gray-600 text-sm">Just keep internal records</span>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
                    <span className="px-3 py-2 bg-yellow-100 text-yellow-700 border border-yellow-300 rounded font-medium text-center text-sm">
                      Medium Risk (1-2)
                    </span>
                    <span className="text-gray-600 text-sm">Report to government authority</span>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
                    <span className="px-3 py-2 bg-orange-100 text-orange-700 border border-orange-300 rounded font-medium text-center text-sm">
                      High Risk (2-3)
                    </span>
                    <span className="text-gray-600 text-sm">Report to government authority</span>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
                    <span className="px-3 py-2 bg-red-100 text-red-700 border border-red-300 rounded font-medium text-center text-sm">
                      Very High Risk (3+)
                    </span>
                    <span className="text-gray-600 text-sm">Report + notify people</span>
                  </div>
                </div>
              </div>
              <div className="mt-6 space-y-4">
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <h4 className="font-semibold text-blue-900 mb-2">GDPR Timeline</h4>
                  <p className="text-blue-800 text-sm">
                    You have <strong>72 hours</strong> from awareness of the breach to notify authorities. If notification is delayed, you must provide reasons for the delay.
                  </p>
                </div>

                {complianceReqs && (
                  <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
                    <h4 className="font-semibold text-gray-900 mb-2">Required Documentation (GDPR Article 33)</h4>
                    <ul className="text-sm text-gray-700 space-y-1">
                      {complianceReqs.documentation.map((doc, idx) => (
                        <li key={idx}>• {doc}</li>
                      ))}
                    </ul>
                    <button 
                      onClick={() => downloadBreachReport()}
                      className="mt-3 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm"
                    >
                      📄 Download PDF Template
                    </button>
                  </div>
                )}

                <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                  <h4 className="font-semibold text-green-900 mb-2">CIA Triad Assessment</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-green-800">Confidentiality Impact:</span>
                      <span className="font-medium">{breachScenario.confidentiality > 0 ? 'Compromised' : 'Not affected'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-green-800">Integrity Impact:</span>
                      <span className="font-medium">{breachScenario.integrity > 0 ? 'Compromised' : 'Not affected'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-green-800">Availability Impact:</span>
                      <span className="font-medium">{breachScenario.availability > 0 ? 'Compromised' : 'Not affected'}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-4 md:p-6 bg-gray-50 min-h-screen">
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 flex items-center gap-3">
          <Shield className="text-blue-600" />
          <span className="hidden sm:inline">ENISA Data Breach Risk Calculator</span>
          <span className="sm:hidden">ENISA Breach Calculator</span>
        </h1>
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-blue-800 leading-relaxed">
            <strong>What this tool does:</strong> Based on ENISA's official methodology, this calculator helps you assess the severity of personal data breaches and determine your obligations under GDPR and NIS2 Directive.
          </p>
          <p className="text-blue-700 text-sm mt-2">
            Compliant with: GDPR Articles 33-34, NIS2 Directive, ENISA Recommendations (December 2013)
          </p>
        </div>
      </div>

      {/* Step Progress */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
        <div className="flex flex-wrap justify-center gap-2 sm:gap-4">
          {steps.map((step, index) => (
            <div key={index} className="flex items-center">
              <div className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-semibold ${
                index <= currentStep ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-500'
              }`}>
                {index < currentStep ? '✓' : index + 1}
              </div>
              <div className="ml-2 hidden sm:block">
                <div className={`text-sm font-medium ${index <= currentStep ? 'text-blue-900' : 'text-gray-500'}`}>
                  {step.title}
                </div>
              </div>
              {index < steps.length - 1 && (
                <div className={`hidden sm:block w-8 h-0.5 mx-4 ${
                  index < currentStep ? 'bg-blue-600' : 'bg-gray-200'
                }`} />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Score Preview (show after step 1) */}
      {currentStep > 1 && (
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-4 mb-6">
          <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
            <div className="text-center sm:text-left flex-1">
              <h3 className="text-lg font-semibold text-blue-900">Current Assessment</h3>
              <div className="text-2xl font-bold text-blue-800 mb-2">Score: {finalScore.toFixed(2)}</div>
              {selectedDataTypes.length > 0 && (
                <div className="text-sm text-blue-700">
                  <span className="font-medium">Data types:</span> {selectedDataTypes.map(id => 
                    dataTypes.find(dt => dt.id === id)?.name
                  ).filter(Boolean).join(', ')}
                </div>
              )}
              {businessSector && (
                <div className="text-sm text-blue-700">
                  <span className="font-medium">Sector:</span> {businessSectors.find(s => s.id === businessSector)?.name}
                </div>
              )}
              {affectedCount && (
                <div className="text-sm text-blue-700">
                  <span className="font-medium">Scale:</span> {
                    affectedCount === '1' ? '1-10 individuals' :
                    affectedCount === '50' ? '11-100 individuals' :
                    affectedCount === '500' ? '101-1,000 individuals' :
                    affectedCount === '5000' ? '1,001-10,000 individuals' :
                    affectedCount === '50000' ? '10,001-100,000 individuals' :
                    affectedCount === '500000' ? 'More than 100,000 individuals' : 
                    'Unknown'
                  }
                </div>
              )}
            </div>
            <div className="text-center sm:text-right">
              <span className={`px-4 py-2 rounded-lg font-semibold text-sm border ${getRiskColor(riskLevel)}`}>
                {riskLevel} Risk
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-4 md:p-8 mb-8">
        {renderStep()}
      </div>

      {/* Validation Message */}
      {validationMessage && (
        <div className="mb-4 p-4 bg-amber-50 border border-amber-200 rounded-lg">
          <div className="flex items-start gap-3">
            <AlertTriangle size={20} className="text-amber-600 mt-0.5 flex-shrink-0" />
            <p className="text-amber-800">{validationMessage}</p>
          </div>
        </div>
      )}

      {/* Quick Actions */}
      {currentStep === 6 && (
        <div className="flex justify-center gap-4 mb-6">
          <button
            onClick={() => {
              setCurrentStep(0);
              setResponses({});
              setSelectedDataTypes([]);
              setCurrentDataTypeIndex(0);
              setBusinessSector('');
              setAffectedCount('');
              setBreachScenario({ confidentiality: 0, integrity: 0, availability: 0 });
              setValidationMessage('');
            }}
            className="flex items-center gap-2 px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 font-medium"
          >
            🔄 Start New Assessment
          </button>
          <button
            onClick={() => downloadBreachReport()}
            className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium"
          >
            📄 Download Report
          </button>
        </div>
      )}

      {/* Navigation */}
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <button
          onClick={prevStep}
          disabled={currentStep === 0}
          className={`flex items-center justify-center gap-2 px-4 md:px-6 py-3 rounded-lg font-medium ${
            currentStep === 0 
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
              : 'bg-gray-600 text-white hover:bg-gray-700'
          }`}
        >
          <ChevronLeft size={20} />
          <span className="hidden sm:inline">Previous</span>
          <span className="sm:hidden">Back</span>
        </button>
        
        {(currentStep < steps.length - 1 || (currentStep === 2 && currentDataTypeIndex < selectedDataTypes.length - 1)) && (
          <button
            onClick={nextStep}
            disabled={!canProceed()}
            className={`flex items-center justify-center gap-2 px-4 md:px-6 py-3 rounded-lg font-medium ${
              canProceed() 
                ? 'bg-blue-600 text-white hover:bg-blue-700' 
                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
            }`}
          >
            <span className="hidden sm:inline">
              {currentStep === 2 && currentDataTypeIndex < selectedDataTypes.length - 1 ? 'Next Data Type' : 'Next'}
            </span>
            <span className="sm:hidden">
              {currentStep === 2 && currentDataTypeIndex < selectedDataTypes.length - 1 ? 'Next Type' : 'Continue'}
            </span>
            <ChevronRight size={20} />
          </button>
        )}
      </div>
    </div>
  );
};

export default DataBreachCalculator;