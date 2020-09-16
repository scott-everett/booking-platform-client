import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MaterialModule } from './material.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ImageCarouselComponent } from './components/image-carousel/image-carousel.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { RoomComponent } from './components/room/room.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { AccountDialogComponent } from './components/dialogs/account-dialog/account-dialog.component';
import { RoomSummaryComponent } from './components/room-summary/room-summary.component';
import { RoomListComponent } from './components/room-list/room-list.component';
import { BookingParametersComponent } from './components/booking-parameters/booking-parameters.component';
import { AppRoutingModule } from './app-routing.module';
import { JwtInterceptor } from './shared/utilities/jwt-interceptor';
import { BookingListComponent } from './components/booking-list/booking-list.component';
import { BookingComponent } from './components/booking/booking.component';

@NgModule({
  declarations: [
    AppComponent,
    ImageCarouselComponent,
    RoomComponent,
    ToolbarComponent,
    AccountDialogComponent,
    RoomSummaryComponent,
    RoomListComponent,
    BookingParametersComponent,
    BookingListComponent,
    BookingComponent,
  ],
  imports: [
    BrowserModule,
    NgbModule,
    HttpClientModule,
    FlexLayoutModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
