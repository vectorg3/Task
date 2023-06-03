import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
  TUI_DEFAULT_MATCHER,
  TuiContextWithImplicit,
  TuiStringHandler,
  tuiPure,
} from '@taiga-ui/cdk';
import { IWorkBorder } from 'src/app/models/USER';
import { ROLES } from '../../constants/ROLES';
import { WORK_BORDERS } from '../../constants/WORK_BORDERS';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent {
  readonly form = new FormGroup({
    username: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(3)],
    }),
    password: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(4)],
    }),
    firstName: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(2)],
    }),
    secondName: new FormControl('', { nonNullable: true }),
    roles: new FormControl([ROLES[0]], {
      nonNullable: true,
      validators: [Validators.required],
    }),
    workBorders: new FormControl([], {
      nonNullable: true,
      validators: [Validators.required],
    }),
  });
  readonly WORK_BORDERS = WORK_BORDERS;
  search: string | null = '';
  readonly stringify: TuiStringHandler<
    IWorkBorder | TuiContextWithImplicit<IWorkBorder>
  > = item => ('name' in item ? item.name : item.$implicit.name);
  constructor(private userService: UserService, private router: Router) {}
  @tuiPure
  filter(search: string | null): readonly string[] {
    return ROLES.filter(item => TUI_DEFAULT_MATCHER(item, search || ''));
  }

  handleSubmit() {
    this.userService.addUser({
      id: Date.now().toString(),
      ...this.form.getRawValue(),
    });
    this.router.navigate(['/list']);
  }
}
