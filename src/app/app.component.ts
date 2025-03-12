import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { Preferences } from '@capacitor/preferences';
import { FormsModule } from '@angular/forms'; 

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: true,
  imports: [IonicModule, FormsModule], 
})
export class AppComponent implements OnInit {
  toggles = { option1: false, option2: false, option3: false };
  rangeValue = 0;
  checkboxes = { checkbox1: false, checkbox2: false, checkbox3: false };
  selectedRadio: string | null = null;

  constructor() {}

  pinFormatter(value: number): string {
    return `${value}%`;
  }

  async ngOnInit() {
    await this.getPreferences();
  }

  async setPreferences() {
    await Preferences.set({
      key: 'userSettings',
      value: JSON.stringify({
        toggles: this.toggles,
        rangeValue: this.rangeValue,
        checkboxes: this.checkboxes,
        selectedRadio: this.selectedRadio,
      }),
    });
  }

  async getPreferences() {
    const savedSettings = await Preferences.get({ key: 'userSettings' });

    if (savedSettings.value) {
      const settings = JSON.parse(savedSettings.value);
      this.toggles = settings.toggles;
      this.rangeValue = settings.rangeValue;
      this.checkboxes = settings.checkboxes;
      this.selectedRadio = settings.selectedRadio;
    }
  }

  async resetAllSettings() {
    this.toggles = { option1: false, option2: false, option3: false };
    this.rangeValue = 0;
    this.checkboxes = { checkbox1: false, checkbox2: false, checkbox3: false };
    this.selectedRadio = null;

    await Preferences.clear();
  }
}
