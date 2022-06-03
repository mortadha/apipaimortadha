import { UserService } from '../services/user.service';

export function userProviderFactory(provider: UserService) {
    provider._getCurrentUserStored();
    return () => provider.userDataObservable().toPromise();
}
