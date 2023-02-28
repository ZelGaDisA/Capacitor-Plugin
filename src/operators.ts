import firebase from 'firebase/app';
import { Observable, pipe, UnaryFunction } from 'rxjs';
import { map } from 'rxjs/operators';

export const mapUserToUserInfo = (): UnaryFunction<Observable<firebase.User>, Observable<firebase.UserInfo>> =>
	pipe(map((user: firebase.User) => {
		if (user) {
			const { uid, providerId, displayName, photoURL, phoneNumber, email } = user;
			return { uid, providerId, displayName, photoURL, phoneNumber, email };
		}
		return user;
	}));

export const mapUserCredentialToUserInfo = (): UnaryFunction<Observable<{ userCredential: firebase.auth.UserCredential }>, Observable<firebase.UserInfo | null>> =>
	pipe(map(({ userCredential }: { userCredential: firebase.auth.UserCredential }) => {
		if (userCredential?.user) {
			const { uid, providerId, displayName, photoURL, phoneNumber, email } = userCredential.user;
			return { uid, providerId, displayName, photoURL, phoneNumber, email };
		}
		return null;
	}));
