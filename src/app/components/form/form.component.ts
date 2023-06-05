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
import { ActivatedRoute, Router } from '@angular/router';
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
    workBorders: new FormControl<IWorkBorder[]>([], {
      nonNullable: true,
      validators: [Validators.required],
    }),
  });
  readonly WORK_BORDERS = WORK_BORDERS;
  search: string | null = '';
  readonly stringify: TuiStringHandler<
    IWorkBorder | TuiContextWithImplicit<IWorkBorder>
  > = item => ('name' in item ? item.name : item.$implicit.name);
  private id!: string;
  constructor(
    private userService: UserService,
    private router: Router,
    private activateRoute: ActivatedRoute
  ) {
    this.id = activateRoute.snapshot.params['id'];
    this.getUser(this.id);
  }
  @tuiPure
  filter(search: string | null): readonly string[] {
    return ROLES.filter(item => TUI_DEFAULT_MATCHER(item, search || ''));
  }

  handleSubmit() {
    if (this.id) {
      this.userService.editUser({
        id: this.id,
        ...this.form.getRawValue(),
      });
    } else {
      this.userService.addUser({
        id: Date.now().toString(),
        ...this.form.getRawValue(),
      });
    }
    this.router.navigate(['/list']);
  }
  getUser(id: string) {
    if (this.id !== undefined) {
      const user = this.userService.getUser(id);
      if (user == undefined) {
        console.log('user with that id not found');
      } else {
        const { id, ...userInfo } = user;
        this.form.setValue(userInfo);
      }
    }
  }
}
