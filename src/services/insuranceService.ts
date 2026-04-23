import { 
  collection, 
  getDocs, 
  doc, 
  getDoc, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  query, 
  where,
  orderBy,
  Timestamp,
  serverTimestamp
} from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage, handleFirestoreError } from '../lib/firebase';
import { Service } from '../../types';

const SERVICES_COLLECTION = 'services';
const CLIENTS_COLLECTION = 'clients';
const POLICIES_COLLECTION = 'policies';

export const insuranceService = {
  // --- Services ---
  async getAllServices(): Promise<Service[]> {
    try {
      const q = query(collection(db, SERVICES_COLLECTION), orderBy('title'));
      const snapshot = await getDocs(q);
      return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Service));
    } catch (error) {
      return handleFirestoreError(error, 'list', SERVICES_COLLECTION);
    }
  },

  async createService(serviceData: any, imageFile?: File) {
    try {
      let imageUrl = serviceData.imageUrl || '';
      if (imageFile) {
        imageUrl = await this.uploadFile(imageFile, `services/${Date.now()}_${imageFile.name}`);
      }
      const docRef = await addDoc(collection(db, SERVICES_COLLECTION), {
        ...serviceData,
        imageUrl,
        createdAt: serverTimestamp()
      });
      return docRef.id;
    } catch (error) {
      return handleFirestoreError(error, 'create', SERVICES_COLLECTION);
    }
  },

  async updateService(id: string, serviceData: any, imageFile?: File) {
    try {
      let imageUrl = serviceData.imageUrl;
      if (imageFile) {
        imageUrl = await this.uploadFile(imageFile, `services/${Date.now()}_${imageFile.name}`);
      }
      const docRef = doc(db, SERVICES_COLLECTION, id);
      await updateDoc(docRef, {
        ...serviceData,
        imageUrl,
        updatedAt: serverTimestamp()
      });
    } catch (error) {
      return handleFirestoreError(error, 'update', `${SERVICES_COLLECTION}/${id}`);
    }
  },

  async deleteService(id: string) {
    try {
      await deleteDoc(doc(db, SERVICES_COLLECTION, id));
    } catch (error) {
      return handleFirestoreError(error, 'delete', `${SERVICES_COLLECTION}/${id}`);
    }
  },

  async getServiceById(id: string): Promise<Service | null> {
    try {
      const docRef = doc(db, SERVICES_COLLECTION, id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        return { id: docSnap.id, ...docSnap.data() } as Service;
      }
      return null;
    } catch (error) {
      return handleFirestoreError(error, 'get', `${SERVICES_COLLECTION}/${id}`);
    }
  },

  // --- Clients ---
  async createClient(clientData: any, idFiles?: File[]) {
    try {
      const idImageUrls: string[] = [];
      
      if (idFiles && idFiles.length > 0) {
        for (const file of idFiles) {
          const fileUrl = await this.uploadFile(file, `clients/ids/${Date.now()}_${file.name}`);
          idImageUrls.push(fileUrl);
        }
      }

      const docRef = await addDoc(collection(db, CLIENTS_COLLECTION), {
        ...clientData,
        idImageUrls,
        createdAt: serverTimestamp()
      });
      return docRef.id;
    } catch (error) {
      return handleFirestoreError(error, 'create', CLIENTS_COLLECTION);
    }
  },

  async getAllClients() {
    try {
      const q = query(collection(db, CLIENTS_COLLECTION), orderBy('createdAt', 'desc'));
      const snapshot = await getDocs(q);
      return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
      return handleFirestoreError(error, 'list', CLIENTS_COLLECTION);
    }
  },

  // --- Policies ---
  async createPolicy(policyData: any, pdfFile?: File) {
    try {
      let pdfUrl = '';
      if (pdfFile) {
        pdfUrl = await this.uploadFile(pdfFile, `policies/pdfs/${Date.now()}_${pdfFile.name}`);
      }

      const docRef = await addDoc(collection(db, POLICIES_COLLECTION), {
        ...policyData,
        pdfUrl,
        createdAt: serverTimestamp()
      });
      return docRef.id;
    } catch (error) {
      return handleFirestoreError(error, 'create', POLICIES_COLLECTION);
    }
  },

  async getAllPolicies() {
    try {
      const q = query(collection(db, POLICIES_COLLECTION), orderBy('createdAt', 'desc'));
      const snapshot = await getDocs(q);
      return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
      return handleFirestoreError(error, 'list', POLICIES_COLLECTION);
    }
  },

  async getPoliciesByClientId(clientId: string) {
    try {
      const q = query(collection(db, POLICIES_COLLECTION), where('clientId', '==', clientId), orderBy('createdAt', 'desc'));
      const snapshot = await getDocs(q);
      return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
      return handleFirestoreError(error, 'list', POLICIES_COLLECTION);
    }
  },

  // --- Payments ---
  async getAllPayments() {
    try {
      const q = query(collection(db, 'payments'), orderBy('date', 'desc'));
      const snapshot = await getDocs(q);
      return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
      return handleFirestoreError(error, 'list', 'payments');
    }
  },

  async createPayment(paymentData: any) {
    try {
      const docRef = await addDoc(collection(db, 'payments'), {
        ...paymentData,
        createdAt: serverTimestamp()
      });
      return docRef.id;
    } catch (error) {
      return handleFirestoreError(error, 'create', 'payments');
    }
  },

  // --- Storage Helper ---
  async uploadFile(file: File, path: string): Promise<string> {
    const storageRef = ref(storage, path);
    const snapshot = await uploadBytes(storageRef, file);
    return await getDownloadURL(snapshot.ref);
  },

  // --- Quotes / Leads ---
  async submitQuoteRequest(quoteData: any) {
    try {
      const docRef = await addDoc(collection(db, 'quotes'), {
        ...quoteData,
        status: 'new',
        createdAt: serverTimestamp()
      });
      return docRef.id;
    } catch (error) {
      return handleFirestoreError(error, 'create', 'quotes');
    }
  }
};
