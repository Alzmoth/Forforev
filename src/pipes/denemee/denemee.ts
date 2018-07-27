import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the DenemeePipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'denemee',
})
export class DenemeePipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(value , args) {
    var ret= value.toLocaleString("es-ES", {minimumFractionDigits: 2}) ;
    return ret;
  }
}
