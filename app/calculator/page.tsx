import DataBreachCalculator from '../components/DataBreachCalculator';
import Link from 'next/link';

export default function CalculatorPage() {
  return (
    <main>
      <DataBreachCalculator />
      
      {/* Footer */}
      <footer className="px-4 md:px-12 py-6 bg-gray-50 border-t">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="flex items-center space-x-2">
            <div className="text-lg font-black">INTGEN</div>
            <div className="text-lg font-light">AI</div>
            <div className="ml-2 text-[10px] uppercase tracking-[0.2em] text-gray-600">
              Compliance Excellence
            </div>
          </div>
          <div className="flex items-center space-x-4 text-xs text-gray-500">
            <span>© 2025 INTGEN.AI. All rights reserved.</span>
            <span>•</span>
            <Link href="/terms" className="text-xs text-gray-500 hover:text-gray-700 transition-colors underline">
              Terms of Service
            </Link>
          </div>
        </div>
      </footer>
    </main>
  );
}