'use client';

import React, { useState, useEffect } from 'react';
import { Shield, AlertTriangle, Calculator, Check, ChevronRight, ChevronLeft, CreditCard, User, Activity, Lock } from 'lucide-react';

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
    yes: number;
    no: number;
  };
}

interface DataType {
  id: string;
  name: string;
  icon: any;
  description: string;
  examples: string[];
  baseScore: number;
}

interface DataTypeQuestions {
  [key: string]: Question[];
}

const DataBreachCalculator = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [responses, setResponses] = useState<Responses>({});
  const [, setFinalScore] = useState(0);
  const [riskLevel, setRiskLevel] = useState('Low');
  const [notifications, setNotifications] = useState<string[]>([]);
  const [selectedDataTypes, setSelectedDataTypes] = useState<string[]>([]);

  // Data types for Step 1
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
      baseScore: 1
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
      baseScore: 2
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
      baseScore: 3
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
        'Criminal records'
      ],
      baseScore: 4
    }
  ];

  // Questions for each data type (Step 1 sub-questions)
  const dataTypeQuestions: DataTypeQuestions = {
    basic_personal: [
      {
        id: 'basic_profiling',
        question: 'Could someone use this basic information to figure out lifestyle or financial situation?',
        explanation: 'Even basic info can reveal a lot when combined together.',
        examples: [
          '✓ Expensive home address + luxury car registration',
          '✓ Private school records + exclusive club membership',
          '✗ Just a name and phone number'
        ],
        modifier: 1
      },
      {
        id: 'basic_sensitive_assumptions',
        question: 'Could someone guess sensitive things from this basic information?',
        explanation: 'Sometimes basic info can hint at very private matters.',
        examples: [
          '✓ Membership in religious organizations',
          '✓ Donations to political causes',
          '✗ Just your work email'
        ],
        modifier: 2
      },
      {
        id: 'basic_vulnerable',
        question: 'Are children involved, or could this information put someone in danger?',
        explanation: 'Some people need extra protection, especially children.',
        examples: [
          '✓ School records with children\'s names',
          '✓ Information about abuse victims',
          '✗ Adult employee directory'
        ],
        modifier: 3
      }
    ],
    behavioral: [
      {
        id: 'behavioral_profile',
        question: 'Could someone build a detailed picture of daily life from this data?',
        explanation: 'Lots of behavior data can reveal very personal details.',
        examples: [
          '✓ Complete daily location tracking',
          '✓ All purchases and shopping patterns',
          '✗ Just one location visit'
        ],
        modifier: 1
      },
      {
        id: 'behavioral_sensitive',
        question: 'Could this behavior data reveal health issues or personal relationships?',
        explanation: 'Sometimes behavior patterns reveal private aspects of life.',
        examples: [
          '✓ Frequent visits to medical specialists',
          '✓ Dating app usage patterns',
          '✗ General shopping patterns'
        ],
        modifier: 2
      }
    ],
    financial: [
      {
        id: 'financial_minimal',
        question: 'Was only minimal financial information exposed (like knowing where someone banks)?',
        explanation: 'Just knowing someone has an account somewhere, without actual access details.',
        examples: [
          '✓ Just knowing someone banks at Chase',
          '✓ Just knowing someone has a credit card',
          '✓ Loyalty card numbers',
          '✗ Actual account numbers'
        ],
        modifier: -2
      },
      {
        id: 'financial_partial',
        question: 'Was partial financial information exposed that alone cannot be used for fraud?',
        explanation: 'Some financial details but missing critical pieces needed for access.',
        examples: [
          '✓ Last 4 digits of credit card',
          '✓ Account number without routing number',
          '✓ Expired credit card numbers',
          '✗ Complete account access information'
        ],
        modifier: -1
      },
      {
        id: 'financial_complete',
        question: 'Was complete financial information exposed that could enable fraud or theft?',
        explanation: 'All information needed to access accounts or make fraudulent transactions.',
        examples: [
          '✓ Full credit card with CVV and expiry',
          '✓ Bank account with routing number',
          '✓ Online banking credentials',
          '✓ Payment app login details'
        ],
        modifier: 1
      }
    ],
    sensitive: [
      {
        id: 'sensitive_general',
        question: 'Does this sensitive information only give general hints?',
        explanation: 'The information is sensitive but not specific.',
        examples: [
          '✓ Knowing someone visited a hospital',
          '✓ Knowing someone attended religious service',
          '✗ Specific medical diagnoses'
        ],
        modifier: -2
      },
      {
        id: 'sensitive_specific',
        question: 'Does this reveal specific private details?',
        explanation: 'Detailed sensitive information that could be harmful.',
        examples: [
          '✓ Specific medical diagnoses',
          '✓ Detailed therapy notes',
          '✗ Just knowing someone went to a doctor'
        ],
        modifier: 1
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
      id: 'ei_email_no_info',
      question: 'Email addresses don\'t show names and aren\'t used much online?',
      explanation: 'The email addresses are random or coded.',
      examples: [
        '✓ user12345@company.com',
        '✓ random.string@service.com',
        '✗ john.smith@company.com'
      ],
      score: 0.25
    },
    {
      id: 'ei_email_searchable',
      question: 'Email addresses don\'t show names but are used on social media?',
      explanation: 'The emails are anonymous but searchable online.',
      examples: [
        '✓ coolguy123@gmail.com (used on social media)',
        '✗ john.smith@company.com'
      ],
      score: 0.5
    },
    {
      id: 'ei_name_small_city',
      question: 'You can identify people by their full names, especially in small towns?',
      explanation: 'Names are unique enough to find these people.',
      examples: [
        '✓ "John Smith" in a small town',
        '✓ Unique names like "Bartholomew Fitzgerald"',
        '✗ "John Smith" in New York City'
      ],
      score: 0.75
    },
    {
      id: 'ei_email_name_primary',
      question: 'Email addresses show real names and are used everywhere online?',
      explanation: 'The worst case - emails have real names and are primary identity.',
      examples: [
        '✓ john.smith@gmail.com (main email)',
        '✗ Anonymous email addresses'
      ],
      score: 1
    }
  ];

  // Circumstances of Breach Questions (Step 4)
  const cbQuestions = [
    {
      id: 'cb_confidentiality',
      category: 'Information Got Out',
      questions: [
        {
          id: 'cb_confidentiality_lost',
          question: 'Information was lost or thrown away, but no evidence anyone accessed it?',
          explanation: 'Something went missing but you don\'t think anyone got it.',
          examples: [
            '✓ Laptop lost during shipping',
            '✓ Papers thrown in regular trash',
            '✗ Data posted online'
          ],
          score: 0
        },
        {
          id: 'cb_confidentiality_known',
          question: 'Information sent to wrong people, but you know who?',
          explanation: 'You accidentally shared with known people.',
          examples: [
            '✓ Sent email to wrong group',
            '✗ Information posted publicly'
          ],
          score: 0.25
        },
        {
          id: 'cb_confidentiality_unknown',
          question: 'Information shared publicly or with unknown people?',
          explanation: 'The information is now public or widely available.',
          examples: [
            '✓ Data posted on websites',
            '✓ Hacker published data',
            '✗ Just sent to wrong recipients'
          ],
          score: 0.5
        }
      ]
    },
    {
      id: 'cb_integrity',
      category: 'Information Was Changed',
      questions: [
        {
          id: 'cb_integrity_altered',
          question: 'Information changed but caught before anyone used it?',
          explanation: 'Data was modified but you fixed it quickly.',
          examples: [
            '✓ Database changed but restored',
            '✗ Changed data was used'
          ],
          score: 0
        },
        {
          id: 'cb_integrity_recoverable',
          question: 'Information changed and people might have used it, but fixable?',
          explanation: 'Wrong information was used but you can correct it.',
          examples: [
            '✓ Medical records changed, patient needs new appointment',
            '✗ Information permanently altered'
          ],
          score: 0.25
        },
        {
          id: 'cb_integrity_unrecoverable',
          question: 'Information changed and can\'t be fixed?',
          explanation: 'Data permanently altered with no recovery.',
          examples: [
            '✓ Database corrupted with no backup',
            '✗ You have backups'
          ],
          score: 0.5
        }
      ]
    },
    {
      id: 'cb_availability',
      category: 'Information Became Unavailable',
      questions: [
        {
          id: 'cb_availability_recoverable',
          question: 'Information lost but easily recoverable?',
          explanation: 'Data unavailable but you have copies.',
          examples: [
            '✓ One copy lost but others available',
            '✗ All copies lost'
          ],
          score: 0
        },
        {
          id: 'cb_availability_temporal',
          question: 'Information lost but recoverable with work?',
          explanation: 'Data gone but can be recovered with effort.',
          examples: [
            '✓ Database needs rebuilding',
            '✗ Information permanently lost'
          ],
          score: 0.25
        },
        {
          id: 'cb_availability_full',
          question: 'Information completely lost forever?',
          explanation: 'Data permanently gone with no recovery.',
          examples: [
            '✓ No backups and original destroyed',
            '✗ Backups available'
          ],
          score: 0.5
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

  const steps = [
    { title: 'Data Types', description: 'What types of information were involved?' },
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

    // Calculate DPC Score from selected data types and their questions
    selectedDataTypes.forEach(typeId => {
      const dataType = dataTypes.find(dt => dt.id === typeId);
      if (dataType) {
        dpc += dataType.baseScore;

        // Add modifiers from data type specific questions
        const questions = dataTypeQuestions[typeId] || [];
        questions.forEach(q => {
          if (responses[q.id] === 'yes' && q.modifier) {
            dpc += q.modifier;
          }
        });
      }
    });

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
      if (responses[q.id] === 'yes') {
        ei = q.score;
      }
    });

    // Calculate CB Score
    cbQuestions.forEach(category => {
      category.questions.forEach(q => {
        if (responses[q.id] === 'yes') {
          cb += q.score;
        }
      });
    });

    const final = (dpc * ei) + cb;

    setFinalScore(final);

    // Determine risk level and notifications
    let risk, actions = [];
    if (final <= 1) {
      risk = 'Low';
      actions = ['Keep an internal record of what happened (required by GDPR Article 33)'];
    } else if (final <= 2) {
      risk = 'Medium';
      actions = ['Report to your Data Protection Authority (the government office that handles privacy)'];
    } else if (final <= 3) {
      risk = 'High';
      actions = ['Report to your Data Protection Authority (the government office that handles privacy)'];
    } else {
      risk = 'Very High';
      actions = [
        'Report to your Data Protection Authority (the government office that handles privacy)',
        'Notify the people whose information was involved in the breach'
      ];
    }

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

  const canProceed = () => {
    switch (currentStep) {
      case 0: return selectedDataTypes.length > 0;
      case 1: return true; // Factors are optional
      case 2: return eiQuestions.some(q => responses[q.id] === 'yes');
      case 3: return true; // At least some breach details should be selected
      default: return true;
    }
  };

  const nextStep = () => {
    if (currentStep < steps.length - 1 && canProceed()) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

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

  const DataTypeCard = ({ dataType }: { dataType: DataType }) => {
    const Icon = dataType.icon;
    const isSelected = selectedDataTypes.includes(dataType.id);
    const questions = dataTypeQuestions[dataType.id] || [];

    return (
      <div className={`border-2 rounded-lg p-6 transition-all ${
        isSelected ? 'border-blue-500 bg-blue-50' : 'border-gray-200 bg-white hover:border-gray-300'
      }`}>
        <div onClick={() => toggleDataType(dataType.id)} className="cursor-pointer">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <Icon size={24} className={isSelected ? 'text-blue-600' : 'text-gray-600'} />
              <h3 className="font-semibold text-lg">{dataType.name}</h3>
            </div>
            <div className={`w-6 h-6 rounded border-2 ${
              isSelected ? 'bg-blue-500 border-blue-500' : 'border-gray-300 bg-white'
            } flex items-center justify-center`}>
              {isSelected && <Check size={16} className="text-white" />}
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
          </div>
        </div>

        {isSelected && questions.length > 0 && (
          <div className="mt-6 pt-6 border-t border-gray-200">
            <h4 className="font-medium text-gray-900 mb-4">Additional questions for {dataType.name}:</h4>
            {questions.map((q: Question) => (
              <QuestionCard key={q.id} question={q} />
            ))}
          </div>
        )}
      </div>
    );
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0: // Data Types
        return (
          <div>
            <h2 className="text-2xl font-semibold mb-6">What types of information were involved in the breach?</h2>
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
              <p className="text-amber-800">
                <strong>Important:</strong> Select ALL types of data that were part of the breach. Most breaches involve multiple types of information. Click each card that applies and answer the follow-up questions.
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {dataTypes.map(dataType => (
                <DataTypeCard key={dataType.id} dataType={dataType} />
              ))}
            </div>
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Selected: {selectedDataTypes.length} type{selectedDataTypes.length !== 1 ? 's' : ''} of data
              </p>
            </div>
          </div>
        );

      case 1: // Risk Factors
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

      case 2: // Ease of Identification
        return (
          <div>
            <h2 className="text-2xl font-semibold mb-6">How easy is it to identify the people involved?</h2>
            <p className="text-gray-600 mb-8">Choose the option that best describes your situation. Only select one.</p>
            <div className="bg-gray-50 rounded-lg p-6">
              {eiQuestions.map(q => (
                <QuestionCard key={q.id} question={q} />
              ))}
            </div>
          </div>
        );

      case 3: // Circumstances of Breach
        return (
          <div>
            <h2 className="text-2xl font-semibold mb-6">What happened during the breach?</h2>
            <p className="text-gray-600 mb-8">Select all situations that apply to your breach.</p>
            {cbQuestions.map(category => (
              <div key={category.id} className="mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">{category.category}</h3>
                <div className="bg-gray-50 rounded-lg p-4">
                  {category.questions.map(q => (
                    <QuestionCard key={q.id} question={q} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        );

      case 4: // Results
        return (
          <div>
            <div className="bg-white rounded-lg shadow-lg border-2 border-gray-200 p-6 mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Calculator size={24} />
                Your Risk Assessment Results
              </h2>
              

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
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <span className="px-4 py-2 bg-green-100 text-green-700 border border-green-300 rounded font-medium">
                      Low Risk (0-1)
                    </span>
                    <span className="text-gray-600">Just keep internal records</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="px-4 py-2 bg-yellow-100 text-yellow-700 border border-yellow-300 rounded font-medium">
                      Medium Risk (1-2)
                    </span>
                    <span className="text-gray-600">Report to government authority</span>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <span className="px-4 py-2 bg-orange-100 text-orange-700 border border-orange-300 rounded font-medium">
                      High Risk (2-3)
                    </span>
                    <span className="text-gray-600">Report to government authority</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="px-4 py-2 bg-red-100 text-red-700 border border-red-300 rounded font-medium">
                      Very High Risk (3+)
                    </span>
                    <span className="text-gray-600">Report + notify people</span>
                  </div>
                </div>
              </div>
              <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-blue-800 text-sm">
                  <strong>Remember:</strong> You have 72 hours to report high-risk breaches. When in doubt, report.
                </p>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6 bg-gray-50 min-h-screen">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4 flex items-center gap-3">
          <Shield className="text-blue-600" />
          Data Breach Risk Calculator
        </h1>
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-blue-800 leading-relaxed">
            <strong>What this tool does:</strong> If you've had a data breach, this calculator helps you figure out how serious it is and what you need to do according to GDPR privacy laws.
          </p>
        </div>
      </div>

      {/* Progress Steps */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          {steps.map((step, index) => (
            <div key={index} className="flex items-center">
              <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                index <= currentStep 
                  ? 'bg-blue-600 border-blue-600 text-white' 
                  : 'bg-white border-gray-300 text-gray-400'
              }`}>
                {index + 1}
              </div>
              <div className="ml-3">
                <div className={`font-medium ${index <= currentStep ? 'text-gray-900' : 'text-gray-400'}`}>
                  {step.title}
                </div>
                <div className="text-sm text-gray-500 hidden lg:block">{step.description}</div>
              </div>
              {index < steps.length - 1 && (
                <ChevronRight className="mx-4 text-gray-400" size={20} />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-8 mb-8">
        {renderStep()}
      </div>

      {/* Navigation */}
      <div className="flex justify-between">
        <button
          onClick={prevStep}
          disabled={currentStep === 0}
          className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium ${
            currentStep === 0 
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
              : 'bg-gray-600 text-white hover:bg-gray-700'
          }`}
        >
          <ChevronLeft size={20} />
          Previous
        </button>
        
        {currentStep < steps.length - 1 && (
          <button
            onClick={nextStep}
            disabled={!canProceed()}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium ${
              canProceed() 
                ? 'bg-blue-600 text-white hover:bg-blue-700' 
                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
            }`}
          >
            Next
            <ChevronRight size={20} />
          </button>
        )}
      </div>
    </div>
  );
};

export default DataBreachCalculator;