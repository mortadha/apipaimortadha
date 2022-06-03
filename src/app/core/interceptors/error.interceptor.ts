import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { UserService } from '../services';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private userService: UserService) {}

    // tslint:disable-next-line:no-any
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError(err => {
            if (err.status === 400 && err.error.message === 'Token_Invalid') {
                this.userService.logout();
                location.reload(true);
            }
            if (err.error.errors) {
                const errorToSend = this.translate(err.error.errors[0]);
                return throwError(errorToSend);
            } else if (err.error.message) {
                const errorToSend = this.translate(err.error.message);
                return throwError(errorToSend);
            } else {
                return throwError(err);
            }
        }));
    }

    translate(message) {
        switch (message) {
            case 'Wrong_Credentials' : {
                return 'Informations de connexion incorrectes';
            }
            case 'Company_Not_Found' : {
                return 'Entreprise introuvable';
            }
            case 'Freelance_Not_Found' : {
                return 'Freelance introuvable';
            }
            case 'Media_Not_Found' : {
                return 'Media introuvable';
            }
            case 'Need_Not_Found' : {
                return 'Besoin introuvable';
            }
            case 'Need_Freelance_Not_Found' : {
                return 'Relation besoin-freelance introuvable';
            }
            case 'Category_Not_Found' : {
                return 'Categorie introuvable';
            }
            case 'Mission_Not_Found' : {
                return 'Mission introuvable';
            }
            case 'Cra_Not_Found' : {
                return 'CRA introuvable';
            }
            case 'CraDay_Not_Found' : {
                return 'Jour du CRA introuvable';
            }
            case 'Email_Already_Exists' : {
               return 'L\'email existe déjà';
            }
            case 'Email_Already_Exists' : {
                return 'L\'adresse email existe déjà';
            }
            case 'Need_JobTitle_Missing': {
                return 'L\'intitulé du poste ne peut etre vide';
            }
            case 'Unauthorized' : {
                return 'Vous n\'etes pas autorisé à effectuer cette action';
            }
            case 'Token_Expired' : {
                return 'Votre token a expiré';
            }
            case 'Recovery_Mail_Already_Sended' : {
                return 'Un mail a déjà été envoyé';
            }
            case 'Token_Invalid' : {
                return 'Token non valide';
            }
            case 'Not_Valid_URL' : {
                return 'URL non valide';
            }
            case 'Internal_Server_Error' : {
                return 'Problème interne';
            }
            case 'Account_Id_Missing' : {
                return 'ID manquant';
            }
            case 'Account_Id_Invalid' : {
                return 'ID Invalide';
            }
            case 'Account_Title_Missing' : {
                return 'Inititulé du poste manquant';
            }
            case 'Account_Title_Invalid' : {
                return 'Intitulé du poste invalide';
            }
            case 'Account_Title_Too_Short' : {
                return 'Intitulé du poste trop court';
            }
            case 'Account_Title_Too_Long' : {
                return 'Intitulé du poste trop long';
            }
            case 'Account_Firstname_Missing' : {
                return 'Prénom manquant';
            }
            case 'Account_Firstname_Invalid' : {
                return 'Prénom invalide';
            }
            case 'Account_Firstname_Too_Short' : {
                return 'Prénom trop court';
            }
            case 'Account_Firstname_Too_Long' : {
                return 'Prénom trop long';
            }
            case 'Account_Lastname_Missing' : {
                return 'Nom de famille manquant';
            }
            case 'Account_Lastname_Invalid' : {
                return 'Nom de famille invalide';
            }
            case 'Account_Lastname_Too_Short' : {
                return 'Nom de famille trop court';
            }
            case 'Account_Lastname_Too_Long' : {
                return 'Nom de famille trop long';
            }
            case 'Account_Email_Missing' : {
                return 'Email manquant';
            }
            case 'Account_Email_Invalid' : {
                return 'Email invalide';
            }
            case 'Account_Phone_Missing' : {
                return 'Numéro de téléphone manquant';
            }
            case 'Account_Phone_Invalid' : {
                return 'Numéro de téléphone invalide';
            }
            case 'Account_Phone_Too_Short' : {
                return 'Numéro de téléphone trop court';
            }
            case 'Account_Phone_Too_Long' : {
                return 'Numéro de téléphone trop long';
            }
            case 'Account_Password_Too_Short' : {
                return 'Mot de passe trop court';
            }
            case 'Account_Password_Invalid' : {
                return 'Mot de passe non valide';
            }
            case 'Account_Password_Missing' : {
                return 'Mot de passe manquant';
            }
            case 'Account_Type_Missing' : {
                return 'Type du compte manquant';
            }
            case 'Account_Type_Invalid' : {
                return 'Type du compte invalide';
            }
            case 'Account_Cgu_Missing' : {
                return 'CGU manquante';
            }
            case 'Account_Cgu_Invalid' : {
                return 'CGU invalides';
            }
            case 'Account_Admin_Missing' : {
                return 'Compte admin manquant';
            }
            case 'Account_Admin_Invalid' : {
                return 'Compte admin invalide';
            }
            case 'Account_CreateDate_Missing' : {
                return 'Date de création du compte manquante';
            }
            case 'Account_CreateDate_Invalid' : {
                return 'Date de création du compte invalide';
            }
            case 'Account_UpdateDate_Missing' : {
                return 'Date de mise à jour du compte manquante';
            }
            case 'Account_UpdateDate_Invalid' : {
                return 'Date de mise à jour du compte invalide';
            }
            case 'Account_DeleteDate_Missing' : {
                return 'Date de suppression du compte manquante';
            }
            case 'Account_DeleteDate_Invalid' : {
                return 'Date de suppression du compte invalide';
            }
            case 'Account_RecoveryToken_Missing' : {
                return 'Token de récupération de mot de passe manquant';
            }
            case 'Account_RecoveryToken_Invalid' : {
                return 'Token de récupération de mot de passe invalide';
            }
            case 'Account_Company_Missing' : {
                return 'Compte entreprise manquant';
            }
            case 'Account_Company_Invalid' : {
                return 'Compte entreprise invalide';
            }
            case 'Company_Name_Invalid' : {
                return 'Nom de l\'entreprise non valide';
            }
            case 'Company_Name_Too_Short' : {
                return 'Nom de l\'entreprise trop court';
            }
            case 'Company_Name_Too_Long' : {
                return 'Nom de l\'entreprise trop long';
            }
            case 'Company_Street_Too_Long' : {
                return 'Rue trop longue';
            }
            case 'Company_Street_Invalid' : {
                return 'Rue de l\'entreprise non valide';
            }
            case 'Company_City_Too_Long' : {
                return 'Ville de l\'entreprise trop longue';
            }
            case 'Company_City_Invalid' : {
                return 'Ville de l\'entreprise non valide';
            }
            case 'Company_Zipcode_Too_Long' : {
                return 'Code postal de l\'entreprise trop long';
            }
            case 'Company_Zipcode_Invalid' : {
                return 'Code postal de l\'entreprise non valide';
            }
            case 'Company_Country_Too_Long' : {
                return 'Pays  de l\'entreprise trop long';
            }
            case 'Company_Country_Invalid' : {
                return 'Pays de l\'entreprise non valide';
            }
            case 'Company_Name_Missing' : {
                return 'Nom de l\'entreprise non valide';
            }
            case 'Company_City_Missing' : {
                return 'Ville de l\'entreprise manquante';
            }
            case 'Company_Zipcode_Missing' : {
                return 'Code postal de l\'entreprise manquant';
            }
            case 'Company_Country_Missing' : {
                return 'Pays de l\'entreprise manquant';
            }
            case 'Freelance_ProfilePicture_Missing' : {
                return 'Photo de profil du freelance manquante';
            }
            case 'Freelance_Id_Missing' : {
                return 'ID du freelance manquant';
            }
            case 'Freelance_Id_Invalid' : {
                return 'ID du freelance non valide';
            }
            case 'Freelance_Headline_Missing' : {
                return 'Titre du freelance manquant';
            }
            case 'Freelance_Headline_Invalid' : {
                return 'Titre du freelance non valide';
            }
            case 'Freelance_Headline_Too_Short' : {
                return 'Titre du freelance trop court';
            }
            case 'Freelance_Account_Missing' : {
                return 'Compte du freelance manquant';
            }
            case 'Freelance_Activate_Invalid' : {
                return 'Activation du freelance non valide';
            }
            case 'Freelance_Activate_Missing' : {
                return 'Activation du freelance manquante';
            }
            case 'Freelance_ProfilePicture_Entity_Not_Found' : {
                return 'Entité de la photo de profil introuvable';
            }
            case 'Freelance_AvailabilityType_Missing' : {
                return 'Type de disponibilité du freelance manquant';
            }
            case 'Freelance_AvailabilityType_Invalid' : {
                return 'Type de disponibilité du freelance non valide';
            }
            case 'Freelance_AvailabilityDate_Missing' : {
                return 'Date de disponibilité du freelance manquante';
            }
            case 'Freelance_AvailabilityDate_Invalid' : {
                return 'Date de disponibilité du freelance non valide';
            }
            case 'Freelance_Educations_Missing' : {
                return 'Etudes du freelance manquantes';
            }
            case 'Freelance_Educations_Invalid' : {
                return 'Etudes du freelance non valide';
            }
            case 'Freelance_Experiences_Missing' : {
                return 'Expériences du freelance manquantes';
            }
            case 'Freelance_Experiences_Invalid' : {
                return 'Expériences du freelance non valide';
            }
            case 'Freelance_City_Too_Long' : {
                return 'Ville du freelance trop longue';
            }
            case 'Freelance_City_Invalid' : {
                return 'Ville du freelance non valide';
            }
            case 'Freelance_Zipcode_Too_Long' : {
                return 'Code postal du freelance trop long';
            }
            case 'Freelance_Zipcode_Invalid' : {
                return 'Code postal du freelance non valide';
            }
            case 'Freelance_Country_Too_Long' : {
                return 'Pays du freelance trop long';
            }
            case 'Freelance_Country_Invalid' : {
                return 'Pays du freelance non valide';
            }
            case 'Freelance_City_Missing' : {
                return 'Ville du freelance manquante';
            }
            case 'Freelance_Zipcode_Missing' : {
                return 'Code postal du freelance manquant';
            }
            case 'Freelance_Country_Missing' : {
                return 'Pays du freelance manquant';
            }
            case 'Freelance_Siret_Missing' : {
                return 'Siret du Freelance manquant';
            }
            case 'Freelance_Siret_Invalid' : {
                return 'Siret du freelance manquant';
            }
            case 'Freelance_Siret_Bad_Length' : {
                return 'Siret du freelance mauvaise taille';
            }
            case 'Freelance_Bio_Invalid' : {
                return 'Description du freelance non valide';
            }
            case 'Freelance_Bio_Missing' : {
                return 'Description du freelance manquante';
            }
            case 'Freelance_Bio_Too_Short' : {
                return 'Description du freeelance trop courte';
            }
            case 'Freelance_Bio_Too_Long' : {
                return 'Description du freelance trop longue';
            }
            case 'Freelance_Tjm_Missing' : {
                return 'TJM du freelance manquant';
            }
            case 'Freelance_Tjm_Invalid' : {
                return 'TJM du freelance non valide';
            }
            case 'Freelance_Experience_Level_Missing' : {
                return 'Niveau d\'expérience du freelance manquante';
            }
            case 'Freelance_Experience_Level_Invalid' : {
                return 'Niveau d\'expérience du freelance non valide';
            }
            case 'Freelance_Mission_Duration_Missing' : {
                return 'Durée des missions du freelance manquante';
            }
            case 'Freelance_Mission_Duration_Invalid' : {
                return 'Durée des missions du freelance non valide';
            }
            case 'Cra_Date_Missing' : {
                return 'Date du CRA manquante';
            }
            case 'Cra_Date_Invalid' : {
                return 'Date du CRA non valide';
            }
            case 'Cra_Status_Missing' : {
                return 'Status du CRA manquant';
            }
            case 'Cra_Status_Invalid' : {
                return 'Status du CRA non valide';
            }
            case 'Cra_Mission_Missing' : {
                return 'Mission du CRA manquante';
            }
            case 'Cra_Mission_Invalid' : {
                return 'Mission du CRA non valide';
            }
            case 'Cra_CraDay_Missing' : {
                return 'Jour du CRA manquant';
            }
            case 'Education_University_Missing' : {
                return 'Université manquante';
            }
            case 'Education_University_Invalid' : {
                return 'Université non valide';
            }
            case 'Education_Id_University_Missing' : {
                return 'ID de l\'université manquant';
            }
            case 'Education_Id_University_Invalid' : {
                return 'ID de l\'université non valide';
            }
            case 'Education_StartedAt_Missing' : {
                return 'Date de début des études manquante';
            }
            case 'Education_StartedAt_Invalid' : {
                return 'Date de début des études non valide';
            }
            case 'Education_EndedAt_Missing' : {
                return 'Date de fin des études manquante';
            }
            case 'Education_EndedAt_Invalid' : {
                return 'Date de fin des études non valide';
            }
            case 'Mission_Id_Missing' : {
                return 'ID de la mission manquant';
            }
            case 'Mission_Id_Invalid' : {
                return 'ID de la mission non valide';
            }
            case 'Mission_Duration_Missing' : {
                return 'Durée de la mission manquant';
            }
            case 'Mission_Duration_Invalid' : {
                return 'Durée de la mission non valide';
            }
            case 'Mission_Tjm_Missing' : {
                return 'TJM de la mission manquant';
            }
            case 'Mission_Tjm_Invalid' : {
                return 'TJM de la mission non valide';
            }
            case 'Mission_Description_Missing' : {
                return 'Description de la mission manquante';
            }
            case 'Mission_Description_Invalid' : {
                return 'Description de la mission non valide';
            }
            case 'Mission_Current_Missing' : {
                return '';
            }
            case 'Mission_Need_Missing' : {
                return 'Besoin de la mission manquant';
            }
            case 'Mission_Need_Invalid' : {
                return 'Besoin de la mission non valide';
            }
            case 'Mission_Freelance_Missing' : {
                return 'Freelance de la mission manquant';
            }
            case 'Mission_Freelance_Invalid' : {
                return 'Freelance de la mission non valide';
            }
            case 'Mission_Date_Invalid' : {
                return 'Date de la mission non valide';
            }
            case 'Mission_Cra_Missing' : {
                return 'CRA de la mission manquant';
            }
            case 'Mission_Cra_Invalid' : {
                return 'CRA de la mission non valide';
            }
            case 'Mission_Signature_Missing' : {
                return 'Signature de la mission manquant';
            }
            case 'Mission_Signature_Invalid' : {
                return 'Signature de la mission non valide';
            }
            case 'Experience_Id_Missing' : {
                return 'ID de l\'expérience manquant';
            }
            case 'Experience_Id_Invalid' : {
                return 'ID de l\'expérience non valide';
            }
            case 'Experience_JobTitle_Missing' : {
                return 'Nom du poste de l\'expérience manquant';
            }
            case 'Experience_JobTitle_Invalid' : {
                return 'Nom du poste de l\'expérience non valide';
            }
            case 'Experience_StartedAt_Missing' : {
                return 'Date de début de l\'expérience manquant';
            }
            case 'Experience_StartedAt_Invalid' : {
                return 'Date de début de l\'expérience non valide';
            }
            case 'Experience_EndedAt_Missing' : {
                return 'Date de fin de l\'expérience manquant';
            }
            case 'Experience_EndedAt_Invalid' : {
                return 'Date de fin de l\'expérience non valide';
            }
            case 'Experience_PresentPosition_Missing' : {
                return 'Position actuelle absente';
            }
            case 'Experience_PresentPosition_Invalid' : {
                return 'Position actuelle non valide';
            }
            case 'Experience_Description_Missing' : {
                return 'Description de l\'expérience manquant';
            }
            case 'Experience_Description_Invalid' : {
                return 'Description de l\'expérience non valide';
            }
            case 'Experience_Techs_Missing' : {
                return 'Techno de l\'expérience manquant';
            }
            case 'Experience_Techs_Invalid' : {
                return 'Techno de l\'expérience non valide';
            }
            case 'Tech_Name_Missing' : {
                return 'Nom de la techno manquant';
            }
            case 'Tech_Name_Invalid' : {
                return 'Nom de la techno non valide';
            }
            case 'Tech_PictureMediaId_Missing' : {
                return 'Icone de la techno manquante';
            }
            case 'Tech_PictureMediaId_Invalid' : {
                return 'Icone de la techno non valide';
            }
            case 'Tech_Not_Found' : {
                return 'Techno non trouvé';
            }
            case 'Tech_Id_Missing' : {
                return 'ID de la techno manquante';
            }
            case 'Tech_Id_Invalid' : {
                return 'ID de la techno non valide';
            }
            case 'Techs_Duplicates' : {
                return 'Technos dupliquées';
            }
            case 'FreelanceNeed_Id_Missing' : {
                return 'ID de la relation freelance-entreprise manquant';
            }
            case 'FreelanceNeed_Id_Invalid' : {
                return 'ID de la relation freelance-entreprise non valide';
            }
            case 'FreelanceNeed_companyReason_Missing' : {
                return 'Raison du refus de l\'entreprise manquant';
            }
            case 'FreelanceNeed_companyReason_Invalid' : {
                return 'Raison du refus de l\'entreprise manquant';
            }
            case 'FreelanceNeed_companyReason_Too_Long' : {
                return 'Raison du refus de l\'entreprise trop longue';
            }
            case 'FreelanceNeed_freelanceReason_Missing' : {
                return 'Raison du refus du freelance manquant';
            }
            case 'FreelanceNeed_freelanceReason_Invalid' : {
                return 'Raison du refus du freelance non valide';
            }
            case 'FreelanceNeed_freelanceReason_Too_Long' : {
                return 'Raison du refus du freelance trop long';
            }
            case 'FreelanceNeed_Not_Found' : {
                return 'Relation ferelance-entreprise non trouvée';
            }
            case 'University_Id_Missing' : {
                return 'ID de l\'université manquant';
            }
            case 'University_Id_Invalid' : {
                return 'ID de l\'université non valide';
            }
            case 'University_Name_Missing' : {
                return 'Nom de l\'université manquant';
            }
            case 'University_Name_Invalid' : {
                return 'Image de l\'université non valide';
            }
            case 'University_PictureMediaId_Missing' : {
                return 'Image de l\'université manquant';
            }
            case 'University_PictureMediaId_Invalid' : {
                return 'Image de l\'université non valide';
            }
            case 'University_Street_Missing' : {
                return 'Rue de l\'université manquante';
            }
            case 'University_Street_Invalid' : {
                return 'Rue de l\'université non valide';
            }
            case 'University_Street_Too_Long' : {
                return 'Rue de l\'université trop longue';
            }
            case 'University_City_Missing' : {
                return 'Ville de l\'université manquante';
            }
            case 'University_City_Invalid' : {
                return 'Ville de l\'université non valide';
            }
            case 'University_City_Too_Long' : {
                return 'Ville de l\'université trop longue';
            }
            case 'University_Zipcode_Missing' : {
                return 'Code postal de l\'université manquant';
            }
            case 'University_Zipcode_Invalid' : {
                return 'Code postal de l\'université non valide';
            }
            case 'University_Zipcode_Too_Long' : {
                return 'Code postal de l\'université trop long';
            }
            case 'University_Country_Missing' : {
                return 'Pays de l\'université manquant';
            }
            case 'University_Country_Invalid' : {
                return 'Pays de l\'université non valide';
            }
            case 'University_Country_Too_Long' : {
                return 'Pays de l\'université trop long';
            }
            case 'University_Not_Found' : {
                return 'Université non trouvée';
            }
            case 'University_PictureUrl_Missing' : {
                return 'Image de l\'université manquante';
            }
            case 'Need_Id_Missing' : {
                return 'ID du besoin manquant';
            }
            case 'Need_Id_Invalid' : {
                return 'ID du besoin non valide';
            }
            case 'Need_CompanyId_Missing' : {
                return 'Entreprise du besoin manquant';
            }
            case 'Need_CompanyId_Invalid' : {
                return 'ID de l\'entreprise du besoin non valide';
            }
            case 'Need_CompanyCity_Missing' : {
                return 'Ville de l\'entrepirse du besoin manquant';
            }
            case 'Need_CompanyCity_Invalid' : {
                return 'Ville du besoin non valide';
            }
            case 'Need_CompanyCountry_Missing' : {
                return 'Pays de l\'entrepirse du besoin manquant';
            }
            case 'Need_CompanyCountry_Invalid' : {
                return 'Pays de l\'entrepirse du besoin non valide';
            }
            case 'Need_JobTitle_Missing' : {
                return 'Intitulé du poste du besoin manquant';
            }
            case 'Need_JobTitle_Invalid' : {
                return 'Intitulé du poste du besoin non valide';
            }
            case 'Need_Description_Missing' : {
                return 'Description du besoin manquant';
            }
            case 'Need_Description_Invalid' : {
                return 'Description du besoin non valide';
            }
            case 'Need_Tjm_Missing' : {
                return 'TJM du besoin manquant';
            }
            case 'Need_Tjm_Invalid' : {
                return 'TJM du besoin non valide';
            }
            case 'Need_ExperienceLevel_Missing' : {
                return 'Niveau d\'expérience du besoin manquant';
            }
            case 'Need_ExperienceLevel_Invalid' : {
                return 'Niveau d\'expérience du besoin non valide';
            }
            case 'Need_AvailabilityType_Missing' : {
                return 'Type de disponibilité du besoin manquant';
            }
            case 'Need_AvailabilityType_Invalid' : {
                return 'Type de disponibilité du besoin non valide';
            }
            case 'Need_AvailabilityDate_Missing' : {
                return 'Date de disponibilité du besoin manquant';
            }
            case 'Need_AvailabilityDate_Invalid' : {
                return 'Date de disponibilité du besoin non valide';
            }
            case 'Need_DurationLast_Missing' : {
                return 'Durée du besoin manquant';
            }
            case 'Need_DurationLast_Invalid' : {
                return 'Durée du besoin non valide';
            }
            case 'Need_DurationType_Missing' : {
                return 'Unité de durée du besoin manquant';
            }
            case 'Need_DurationType_Invalid' : {
                return 'Unité de durée du besoin non valide';
            }
            case 'Need_TechsPrimary_Missing' : {
                return 'Techno primaire du besoin manquant';
            }
            case 'Need_TechsPrimary_Invalid' : {
                return 'Techno primaire du besoin non valide';
            }
            case 'Need_FreelanceNeeds_Missing' : {
                return 'Relation freelance-entreprise du besoin manquant';
            }
            case 'Need_FreelanceNeeds_Invalid' : {
                return 'Relation freelance-entreprise du besoin non valide';
            }
            case 'Notification_Not_Found' : {
                return 'Notification non trouvé';
            }
            case 'Notification_Type_Missing' : {
                return 'Type de notification manquant';
            }
            case 'User_Not_Found' : {
                return 'Utilisateur non trouvé';
            }
            case 'Invalid_File' : {
                return 'Fichier non valide';
            }
            case 'Name_Already_Exists': {
                return 'Nom déja existant';
            }
            case 'ID must be an UUID' : {
                return 'L\'ID doit être un UUID';
            }
            case 'Must provide an ID' : {
                return 'Un ID est nécessaire';
            }
        }
        return message;
    }
}
