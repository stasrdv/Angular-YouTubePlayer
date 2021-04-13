import { AbstractControl } from "@angular/forms";


export class CustomValidators {

    public static youtubeUrlValidator(control: AbstractControl): { [key: string]: boolean } | null {
        if (control.value) {
            const regExp = /^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
            if (!control.value.match(regExp)) {
                return { 'validUrl': true };
            }
        }
        return null;
    }
}