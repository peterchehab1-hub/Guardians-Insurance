
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, getDocs, doc, serverTimestamp } from 'firebase/firestore';
import { readFile } from 'fs/promises';

async function seed() {
  try {
    const config = JSON.parse(await readFile('./firebase-applet-config.json', 'utf-8'));
    const app = initializeApp(config);
    const db = getFirestore(app, config.firestoreDatabaseId);

    console.log('--- SERVER SIDE SEED START ---');
    console.log('Project:', config.projectId);

    const SERVICES_DATA = [
      {
        title: 'Home Insurance',
        icon: '🏠',
        shortDescription: 'Comprehensive protection for your home and belongings.',
        fullDescription: 'Our home insurance covers fire, theft, natural disasters, and third-party liability.',
        imageUrl: '/images/home-insurance.png'
      },
      {
        title: 'Car Insurance',
        icon: '🚗',
        shortDescription: 'Flexible coverage for all your road adventures.',
        fullDescription: 'From comprehensive plans to third-party liability, our auto insurance keeps you moving.',
        imageUrl: '/images/car-insurance.png'
      },
      {
        title: 'Medical Insurance',
        icon: '🏥',
        shortDescription: 'Health first. World-class medical coverage.',
        fullDescription: 'Access to the top hospitals and clinics in the country.',
        imageUrl: '/images/medical-insurance.png'
      },
      {
        title: 'Life Insurance',
        icon: '🛡️',
        shortDescription: "Secure your family's future and financial stability.",
        fullDescription: 'Life is unpredictable. Ensure your loved ones are financially protected.',
        imageUrl: '/images/life-insurance.png'
      },
      {
        title: 'Travel Insurance',
        icon: '✈️',
        shortDescription: 'Worry-free journeys around the globe.',
        fullDescription: 'Covers medical emergencies abroad and trip cancellations.',
        imageUrl: '/images/travel-insurance.png'
      },
      {
        title: 'Business Insurance',
        icon: '💼',
        shortDescription: 'Protecting your enterprise and professional assets.',
        fullDescription: 'Tailored solutions for businesses of all sizes.',
        imageUrl: '/images/business-insurance.png'
      }
    ];

    // 1. Sync Services
    const snapshot = await getDocs(collection(db, 'services'));
    const existing = snapshot.docs.map(d => d.data().title);

    for (const service of SERVICES_DATA) {
      if (!existing.includes(service.title)) {
        await addDoc(collection(db, 'services'), {
          ...service,
          category: 'General',
          createdAt: serverTimestamp()
        });
        console.log('Added:', service.title);
      }
    }

    // 2. Add Peter test user
    const clientSnap = await getDocs(collection(db, 'clients'));
    const peterExists = clientSnap.docs.some(d => d.data().phone === '71971213');
    if (!peterExists) {
      await addDoc(collection(db, 'clients'), {
        name: 'Peter',
        phone: '71971213',
        email: 'peter@test.com',
        address: 'Beirut, Lebanon',
        policyType: 'Home Insurance',
        policyNumber: 'G-71971213',
        premium: '500',
        role: 'client',
        createdAt: serverTimestamp()
      });
      console.log('Added test account: Peter');
    }

    console.log('--- SYNC COMPLETE ---');
    process.exit(0);
  } catch (err) {
    console.error('FAILED:', err);
    process.exit(1);
  }
}

seed();
