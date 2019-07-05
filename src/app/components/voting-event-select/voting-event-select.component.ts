import { Component, OnInit } from '@angular/core';
import { AppSessionService } from '../../app-session.service';
import { VotingEvent } from 'src/app/models/voting-event';
import { MatSelect } from '@angular/material/select';
import { getIdentificationRoute } from 'src/app/utils/voting-event-flow.util';
import { Router } from '@angular/router';

@Component({
  selector: 'byor-voting-event-select',
  templateUrl: './voting-event-select.component.html',
  styleUrls: ['./voting-event-select.component.scss']
})
export class VotingEventSelectComponent implements OnInit {
  votingEventName: string;

  constructor(public appSession: AppSessionService, private router: Router) {}

  ngOnInit() {}

  eventSelected(eventSelect: MatSelect) {
    this.votingEventName = eventSelect.value;
  }

  goToIdentification() {
    const votingEvent = this.appSession.getVotingEvents().find((ve) => ve.name === this.votingEventName);
    this.appSession.setSelectedVotingEvent(votingEvent);
    const route = getIdentificationRoute(votingEvent);
    this.router.navigate([route]);
  }
}
