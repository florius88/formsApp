import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  templateUrl: './dynamic-page.component.html',
  styles: [
  ]
})
export class DynamicPageComponent {

  /* public myForm2 = new FormGroup({
    favoriteGames: new FormArray([])
  }) */

  public myForm: FormGroup = this.fb.group(
    {
      name: ['', [Validators.required, Validators.minLength(3)]],
      favoriteGames: this.fb.array([
        ['Metal Gear', [Validators.required]],
        ['Death Stranding', [Validators.required]],
      ])
    }
  )

  public newFavorite: FormControl = new FormControl('', Validators.required);

  constructor(private fb: FormBuilder) { }

  get favoriteGames() {
    return this.myForm.get('favoriteGames') as FormArray;
  }

  onAddToFavorites(): void {
    if (this.newFavorite.invalid) return

    const newGame = this.newFavorite.value;
    /* this.favoriteGames.push(new FormControl(newGame, Validators.required))
    Así se haría si no estuviera trabajando con el FormBuilder */
    this.favoriteGames.push(this.fb.control(newGame, Validators.required));

    this.newFavorite.reset();
  }

  onDeleteFavorite(index: number): void {
    /* this.myForm.controls['favoriteGames']...
    Así sería si no tuviera el getter */
    this.favoriteGames.removeAt(index);
  }

  onSubmit() {
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    }
    console.log(this.myForm.value);
    (this.myForm.controls['favoriteGames'] as FormArray) = this.fb.array([]);
    this.myForm.reset();
  }

}
