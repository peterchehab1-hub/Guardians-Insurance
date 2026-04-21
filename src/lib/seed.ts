import { collection, addDoc, getDocs, writeBatch, doc } from 'firebase/firestore';
import { db } from './firebase';
import { SERVICES_DATA } from '../../constants';

export const seedInitialData = async () => {
  const servicesSnapshot = await getDocs(collection(db, 'services'));
  
  if (servicesSnapshot.empty) {
    console.log('Seeding initial services...');
    const batch = writeBatch(db);
    
    for (const service of SERVICES_DATA) {
      const newDocRef = doc(collection(db, 'services'));
      // Remove id from the data object as firestore uses doc id
      const { id, ...data } = service;
      batch.set(newDocRef, { ...data, category: 'General' });
    }
    
    await batch.commit();
    console.log('Seeding complete!');
    return true;
  } else {
    console.log('Services collection already has data. Skipping seed.');
    return false;
  }
};
