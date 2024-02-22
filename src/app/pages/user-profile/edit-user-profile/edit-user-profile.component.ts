import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit-user-profile',
  templateUrl: './edit-user-profile.component.html',
  styleUrls: ['./edit-user-profile.component.scss']
})
export class EditUserProfileComponent implements OnInit {
  imagePath: string = 'assets/img/theme/team-4-800x800.jpg';
  modalOpen: boolean = false;

  constructor() { }

  ngOnInit() {
  }
  openModal() {
    this.modalOpen = true;
  }

  closeModal() {
    this.modalOpen = false;
  }

  stopPropagation(event: Event) {
    event.stopPropagation();
  }
  
  handleFileInput(files: FileList): void {
    if (files && files.length > 0) {
      const file = files[0];
      const reader = new FileReader();

      reader.onload = (event: any) => {
        this.imagePath = event.target.result;
      };

      reader.readAsDataURL(file);
    }
  }
}
