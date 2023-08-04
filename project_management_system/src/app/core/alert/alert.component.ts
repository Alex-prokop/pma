import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { Subscription } from 'rxjs';
import { Alert, AlertType } from '../../models/alert';
import { AlertService } from '../../services/alert.service';

@Component({
  selector: 'alert',
  templateUrl: 'alert.component.html',
  styleUrls: ['alert.component.scss'],
})
export class AlertComponent implements OnInit, OnDestroy {
  @Input() id = 'default-alert';
  @Input() fade = true;

  alerts: Alert[] = [];
  alertSubscription!: Subscription;
  routeSubscription!: Subscription;

  constructor(private router: Router, private alertService: AlertService) {}

  ngOnInit() {
    this.subscribeToAlerts();
    this.subscribeToRouteChange();
  }

  ngOnDestroy() {
    this.unsubscribeFromAlerts();
    this.unsubscribeFromRouteChange();
  }

  subscribeToAlerts() {
    this.alertSubscription = this.alertService
      .onAlert(this.id)
      .subscribe((alert) => this.handleNewAlert(alert));
  }

  handleNewAlert(alert: Alert) {
    if (!alert.message) {
      this.alerts = this.alerts.filter((x) => x.keepAfterRouteChange);
      this.alerts.forEach((x) => delete x.keepAfterRouteChange);
      return;
    }

    this.alerts.push(alert);

    if (alert.autoClose) {
      setTimeout(() => this.removeAlert(alert), 3000);
    }
  }

  subscribeToRouteChange() {
    this.routeSubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.alertService.clear(this.id);
      }
    });
  }

  unsubscribeFromAlerts() {
    this.alertSubscription.unsubscribe();
  }

  unsubscribeFromRouteChange() {
    this.routeSubscription.unsubscribe();
  }

  removeAlert(alert: Alert) {
    if (!this.alerts.includes(alert)) return;

    if (this.fade) {
      alert.fade = true;

      setTimeout(() => {
        this.alerts = this.alerts.filter((x) => x !== alert);
      }, 250);
    } else {
      this.alerts = this.alerts.filter((x) => x !== alert);
    }
  }

  cssClass(alert: Alert) {
    if (!alert) return;

    const classes = [
      'alert',
      'alert-dismissable',
      'fade',
      'show',
      'mt-4',
      'ml-20',
      'container',
    ];
    const alertTypeClass = {
      [AlertType.Success]: 'alert-success',
      [AlertType.Error]: 'alert-danger',
      [AlertType.Info]: 'alert-info',
      [AlertType.Warning]: 'alert-warning',
    };

    if (alert.type !== undefined) {
      classes.push(alertTypeClass[alert.type]);
    }

    if (alert.fade) {
      classes.push(
        'transition-opacity',
        'duration-500',
        'opacity-0',
        'hover:opacity-100'
      );
    }

    return classes.join(' ');
  }
}
