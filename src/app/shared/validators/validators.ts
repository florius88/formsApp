import { FormControl } from '@angular/forms';


/* El username no puede ser Strider */
export const cantBeStrider = (control: FormControl) => {

    const value: string = control.value.trim().toLowerCase();

    if (value === 'strider') {
        return {
            noStrider: true,
        }
    }

    return null;
}