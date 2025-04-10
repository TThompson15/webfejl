import { Injectable } from '@angular/core';
import { Firestore, doc, setDoc, getDoc } from '@angular/fire/firestore';
import { UserProfile } from '../models/user-profile.model';

@Injectable({ providedIn: 'root' })
export class UserService {
  constructor(private firestore: Firestore) {}

  saveUserProfile(profile: UserProfile): Promise<void> {
    const userDocRef = doc(this.firestore, 'users', profile.uid);
    return setDoc(userDocRef, {
      ...profile,
      createdAt: profile.createdAt?.toISOString() ?? new Date().toISOString()
    });
  }

  async getUserProfile(uid: string): Promise<UserProfile | null> {
    const userDocRef = doc(this.firestore, 'users', uid);
    const snapshot = await getDoc(userDocRef);
    if (snapshot.exists()) {
      const data = snapshot.data();
      return {
        uid,
        email: data['email'],
        displayName: data['displayName'],
        address: data['address'],
        phone: data['phone'],
        createdAt: data['createdAt'] ? new Date(data['createdAt']) : undefined
      };
    }
    return null;
  }
}
