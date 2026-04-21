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
