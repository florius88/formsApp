import { FormControl, ValidationErrors } from '@angular/forms';


/* Patron de validacion del nombre */
export const firstNameAndLastnamePattern: string = '([a-zA-Z]+) ([a-zA-Z]+)';

/* Patron de validacion de email */
export const emailPattern: string = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";

/* El username no puede ser Strider */
export const cantBeStrider = (control: FormControl): ValidationErrors | null => {

    const value: string = control.value.trim().toLowerCase();

    if (value === 'strider') {
        return {
            noStrider: true,
        }
    }

    return null;
}
