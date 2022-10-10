import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filepipe'
})
export class FilepipePipe implements PipeTransform {

  transform(size : number, extension : string = 'MB'): string {
    return "File SIZE is -" +(size / (1024 *1024)).toFixed(2) + extension;
  }

}
