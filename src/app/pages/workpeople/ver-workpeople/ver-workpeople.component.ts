import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ver-workpeople',
  templateUrl: './ver-workpeople.component.html',
  styleUrls: ['./ver-workpeople.component.scss']
})
export class VerWorkpeopleComponent implements OnInit {
  imagePath: string = 'https://t3.ftcdn.net/jpg/05/17/79/88/360_F_517798849_WuXhHTpg2djTbfNf0FQAjzFEoluHpnct.jpg';
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
