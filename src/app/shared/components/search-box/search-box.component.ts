import { Component, EventEmitter, Input, Output, OnInit, OnDestroy } from '@angular/core';
import { Subject, Subscription, debounceTime } from 'rxjs';

@Component({
  selector: 'search-search-box',
  templateUrl: './search-box.component.html',
  styles: [
  ]
})
//ondestroy para evitar que es suscribe se siga escuchando

export class SearchBoxComponent implements OnInit, OnDestroy {

//usado como el tubo del agua
private debouncer:Subject<string>= new Subject<string>();

//para el destroy
private debouncerSuscription?: Subscription;

@Input()
public placeholder: string ='';

@Input()
public initialValue: string ='';

@Output()
public onValue=new EventEmitter<string>();

//estos eventos son como cuando se oprime enter
@Output()
public onDebounce=new EventEmitter<string>();

ngOnInit(): void {
  this.debouncer
  .pipe(
    debounceTime(300)
  )
  .subscribe(value=>{
   this.onDebounce.emit(value);
  })
}

ngOnDestroy(): void {
  this.debouncerSuscription?.unsubscribe();

}

emitValue(value: string):void{
  this.onValue.emit(value)
}

onKeyPress(searchTerm:string){
  this.debouncer.next(searchTerm)
}
}
