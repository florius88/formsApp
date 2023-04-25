import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';


const rtx = {
  name: 'RTX 5090',
  price: 2500,
  inStorage: 6
}

@Component({
  templateUrl: './basic-page.component.html',
  styles: [
  ]
})
export class BasicPageComponent implements OnInit {

  /* public myForm: FormGroup = new FormGroup({
    // new FormControl(
    //  'valor por defecto', 
    //  una única validación ó [validaciones síncronas], 
    //  [validaciones asíncronas]
    //  )
    name: new FormControl('', [], []),
    price: new FormControl(0, [], []),
    inStorage: new FormControl(0, [], []),
  }); */

  public myForm: FormGroup = this.fb.group({
    // Requerido y con una longitud mayor de 3 caracteres
    name: ['', [Validators.required, Validators.minLength(3)]],
    // Requerido y mínimo valor 0
    price: [0, [Validators.required, Validators.min(0)]],
    inStorage: [0, [Validators.required, Validators.min(0)]],
  })


  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    // this.myForm.reset(rtx);
  }

  isValidField(field: string): boolean | null {
    return this.myForm.controls[field].errors
      && this.myForm.controls[field].touched;
  }

  getFieldError(field: string): string | null {

    if (!this.myForm.controls[field]) return null;

    const errors = this.myForm.controls[field].errors || {};

    // Me da un array con todos los errores que vengan
    for (const key of Object.keys(errors)) {
      switch (key) {
        case 'required':
          return 'Este campo es requerido';
        case 'minlength':
          return `Este campo requeriere un mínimo de ${errors['minlength'].requiredLength} letras`;        
      }
    }
    return null;
  }

  onSave() {

    if (this.myForm.invalid) {
      // Marca todo como que ha sido tocado . Pristine = true
      this.myForm.markAllAsTouched();
      return;
    }

    console.log(this.myForm.value)

    // REESTABLECER EL VALOR DEL FORMULARIO
    /* El "problema" de trabajar con setValue es que necesita un input o un elemento
    en particular del formulario
    this.myForm.setValue()
    */
    this.myForm.reset({ price: 0, inStorage: 0 });

  }

}
