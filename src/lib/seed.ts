import { collection, addDoc, getDocs, writeBatch, doc, query, where, serverTimestamp } from 'firebase/firestore';
import { db, auth } from './firebase';
import { SERVICES_DATA } from '../../constants';

export const seedInitialData = async () => {
  try {
    const currentUser = auth.currentUser;
    console.log('--- SEEDING AUTH CHECK ---');
    console.log('User detected:', currentUser?.email);
    console.log('Check: If you see ERR_BLOCKED_BY_CLIENT, disable your AdBlocker.');
    console.log('--------------------------');

    console.log('Operation: Testing database reachability...');
    const dbTest = collection(db, 'services');
    
    console.log('Operation: Fetching services snapshot');
    const servicesSnapshot = await getDocs(collection(db, 'services'));
    const existingTitles = servicesSnapshot.docs.map(d => d.data().title);
    
    let seededCount = 0;
    
    console.log('Operation: Reviewing services to add');
    for (const service of SERVICES_DATA) {
      if (!existingTitles.includes(service.title)) {
        const { id: _, ...data } = service;
        const payload = {
          ...data,
          category: 'General',
          imageUrl: service.imageUrl || service.image || '',
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp()
        };
        console.log(`Operation: Adding service: ${service.title}`);
        await addDoc(collection(db, 'services'), payload);
        seededCount++;
      }
    }
    
    if (seededCount > 0) console.log(`Result: Synced ${seededCount} services.`);

    console.log('Operation: Fetching clients snapshot');
    const allClientsSnapshot = await getDocs(collection(db, 'clients'));
    const peterExists = allClientsSnapshot.docs.some(doc => 
      doc.data().phone === '71971213' || 
      (doc.data().name === 'Peter' && doc.data().phone === '71971213')
    );
    
    if (!peterExists) {
      console.log('Operation: Seeding master test account (Peter)');
      await addDoc(collection(db, 'clients'), {
        name: 'Peter',
        phone: '71971213',
        email: 'peter@test.com',
        address: 'Beirut, Lebanon',
        policyType: 'Home Insurance',
        policyNumber: 'G-71971213',
        premium: '500',
        role: 'client',
        idImageUrls: [],
        createdAt: serverTimestamp()
      });
      console.log('Result: Test account ready!');
    }
    
    return seededCount > 0 || !peterExists;
  } catch (error: any) {
    console.error('Logic Failure Point:', error.message);
    console.error('Full Error Object:', error);
    throw error;
  }
};
