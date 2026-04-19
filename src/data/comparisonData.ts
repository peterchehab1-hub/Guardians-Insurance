
import { ComparisonResult, InsuranceType } from '../../types.ts';

export const COMPARISON_DATA: Record<InsuranceType, ComparisonResult[]> = {
  car: [
    {
      company: 'Fidelity',
      priceLevel: 'Medium',
      flexibility: 'High (Multiple add-ons)',
      claimsSpeed: 'Fast (App-based)',
      networkStrength: 'Excellent (Partnered Garages)',
      bestUseCase: 'New cars & high-value vehicles',
      isRecommended: true
    },
    {
      company: 'Bankers',
      priceLevel: 'Low',
      flexibility: 'Medium',
      claimsSpeed: 'Reliable',
      networkStrength: 'Good',
      bestUseCase: 'Budget-conscious drivers'
    },
    {
      company: 'UFA',
      priceLevel: 'High',
      flexibility: 'Premium',
      claimsSpeed: 'Very Fast',
      networkStrength: 'VIP Network',
      bestUseCase: 'Luxury car owners'
    }
  ],
  medical: [
    {
      company: 'Solidarity',
      priceLevel: 'Medium',
      flexibility: 'High',
      claimsSpeed: 'Fast',
      networkStrength: 'Top Hospitals (AUBMC, CMC)',
      bestUseCase: 'Families seeking comprehensive care',
      isRecommended: true
    },
    {
      company: 'Fidelity',
      priceLevel: 'Low',
      flexibility: 'Good',
      claimsSpeed: 'Moderate',
      networkStrength: 'Wide Network',
      bestUseCase: 'Individuals & startups'
    },
    {
      company: 'Bankers',
      priceLevel: 'High',
      flexibility: 'Customizable',
      claimsSpeed: 'Personalized',
      networkStrength: 'International options',
      bestUseCase: 'Corporate executives'
    }
  ],
  travel: [
    {
      company: 'UFA',
      priceLevel: 'Low',
      flexibility: 'Standard',
      claimsSpeed: 'Global Assistance',
      networkStrength: 'Schengen Approved',
      bestUseCase: 'Short vacationers',
      isRecommended: true
    },
    {
      company: 'Fidelity',
      priceLevel: 'Medium',
      flexibility: 'High',
      claimsSpeed: '24/7 Hotline',
      networkStrength: 'Global Network',
      bestUseCase: 'Frequent business travelers'
    },
    {
      company: 'Bankers',
      priceLevel: 'Medium',
      flexibility: 'Good',
      claimsSpeed: 'Reliable',
      networkStrength: 'Wide Coverage',
      bestUseCase: 'Adventure seekers'
    }
  ],
  life: [
    {
      company: 'Fidelity',
      priceLevel: 'Medium',
      flexibility: 'Savings + Protection',
      claimsSpeed: 'Dignified',
      networkStrength: 'Strong Reinsurance',
      bestUseCase: 'Young families',
      isRecommended: true
    },
    {
      company: 'Bankers',
      priceLevel: 'High',
      flexibility: 'Investment Focus',
      claimsSpeed: 'Professional',
      networkStrength: 'Financial Stability',
      bestUseCase: 'Long-term wealth builders'
    },
    {
      company: 'UFA',
      priceLevel: 'Low',
      flexibility: 'Pure Protection',
      claimsSpeed: 'Quick Payouts',
      networkStrength: 'Reliable',
      bestUseCase: 'Budget protection'
    }
  ],
  home: [
    {
      company: 'Fidelity',
      priceLevel: 'Low',
      flexibility: 'Standard',
      claimsSpeed: 'Standard',
      networkStrength: 'Nationwide Support',
      bestUseCase: 'Apartment owners',
      isRecommended: true
    },
    {
      company: 'UFA',
      priceLevel: 'Medium',
      flexibility: 'All-risk options',
      claimsSpeed: 'Fast',
      networkStrength: 'Expert Valuators',
      bestUseCase: 'Villa & high-end assets'
    },
    {
      company: 'Bankers',
      priceLevel: 'High',
      flexibility: 'Bespoke',
      claimsSpeed: 'Personalized',
      networkStrength: 'Premium Network',
      bestUseCase: 'Antique collectors'
    }
  ],
  business: [
    {
      company: 'Bankers',
      priceLevel: 'High',
      flexibility: 'Bespoke Risk Plans',
      claimsSpeed: 'Dedicated Advisor',
      networkStrength: 'Corporate Grade',
      bestUseCase: 'Large industries',
      isRecommended: true
    },
    {
      company: 'Fidelity',
      priceLevel: 'Medium',
      flexibility: 'SME focused',
      claimsSpeed: 'Efficient',
      networkStrength: 'Wide Coverage',
      bestUseCase: 'Startups & retail'
    },
    {
      company: 'UFA',
      priceLevel: 'Low',
      flexibility: 'Basic Liability',
      claimsSpeed: 'Standard',
      networkStrength: 'Reliable',
      bestUseCase: 'Small offices'
    }
  ]
};
