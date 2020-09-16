import { TestBed } from '@angular/core/testing';

import { RoutePathService } from './route-path.service';

describe('RoutePathService', () => {
  let service: RoutePathService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RoutePathService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
