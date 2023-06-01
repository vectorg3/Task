import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
  TUI_DEFAULT_MATCHER,
  TuiContextWithImplicit,
  TuiIdentityMatcher,
  TuiStringHandler,
  tuiPure,
} from '@taiga-ui/cdk';
import { IWorkBorder } from 'src/app/models/USER';
import { ROLES } from '../../constants/ROLES';
import { WORK_BORDERS } from '../../constants/WORK_BORDERS';
@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent {
  readonly form = new FormGroup({
    username: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
    ]),
    firstName: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
    ]),
    lastName: new FormControl(''),
    roles: new FormControl([ROLES[0]], [Validators.required]),
    workBorders: new FormControl([], [Validators.required]),
  });
  readonly WORK_BORDERS = WORK_BORDERS;
  search: string | null = '';
  readonly stringify: TuiStringHandler<
    IWorkBorder | TuiContextWithImplicit<IWorkBorder>
  > = item => ('name' in item ? item.name : item.$implicit.name);
  @tuiPure
  filter(search: string | null): readonly string[] {
    return ROLES.filter(item => TUI_DEFAULT_MATCHER(item, search || ''));
  }

  handleSubmit() {
    console.log(this.form.value)
  }
}
