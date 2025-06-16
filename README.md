# Data Breach Risk Calculator

A Next.js application that helps organizations assess the severity of data breaches and determine notification requirements according to GDPR.

## Features

- **Multi-step Assessment**: Guides users through a comprehensive breach assessment
- **Data Type Classification**: Categorizes different types of personal data affected
- **Risk Factors**: Evaluates increasing and decreasing factors that affect breach severity
- **Identification Risk**: Assesses how easily individuals can be identified
- **Breach Circumstances**: Evaluates the specific circumstances of the breach
- **Automated Risk Calculation**: Calculates risk level based on comprehensive risk assessment methodology
- **Clear Action Items**: Provides specific notification requirements based on risk level

## Risk Levels

- **Low (0-1)**: Keep internal records only
- **Medium (1-2)**: Report to Data Protection Authority
- **High (2-3)**: Report to Data Protection Authority
- **Very High (3+)**: Report to DPA + Notify affected individuals

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone [repository-url]

# Navigate to project directory
cd nextjs-breach-calculator

# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to use the calculator.

## Technology Stack

- **Next.js 14**: React framework with App Router
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first styling
- **Lucide Icons**: Icon library

## Usage

1. **Select Data Types**: Choose all types of personal data involved in the breach
2. **Risk Factors**: Answer questions about factors that increase or decrease risk
3. **Identification**: Determine how easily affected individuals can be identified
4. **Breach Details**: Provide information about how the breach occurred
5. **View Results**: See risk level and required actions

## Based on GDPR Requirements

This calculator implements a comprehensive risk assessment methodology to help organizations comply with GDPR Article 33 and 34 requirements for data breach notifications.

## License

MIT