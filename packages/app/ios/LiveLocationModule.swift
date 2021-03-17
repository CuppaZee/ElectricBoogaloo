//
//  LiveLocationModule.swift
//  CuppaZee
//
//  Created by user924093 on 3/17/21.
//

import Foundation
import UserNotifications
import CoreLocation

protocol LocationManagerDelegate: AnyObject {
    func locationManager(_ manager: CLLocationManager, didUpdateLocations locations: [CLLocation])
}

class LocationManager: NSObject {
    static let shared = LocationManager()

    weak var delegate: LocationManagerDelegate?
    private let locationManager = CLLocationManager()
    private override init() {
        super.init()
        locationManager.delegate = self
        locationManager.activityType = .other
    }

    func requestAlwaysAuthorization() {
        locationManager.requestAlwaysAuthorization()
    }

    func startMonitoringSignificantLocationChanges() {
        locationManager.startMonitoringSignificantLocationChanges()
    }
  
    func stopMonitoringSignificantLocationChanges() {
      locationManager.stopMonitoringSignificantLocationChanges()
    }
}

extension LocationManager: CLLocationManagerDelegate {
    func locationManager(_ manager: CLLocationManager, didUpdateLocations locations: [CLLocation]) {
      debugPrint(locations)
        delegate?.locationManager(manager, didUpdateLocations: locations)
    }
}

@objc(LiveLocationModule)
class LiveLocationModule: NSObject {
  
//  @objc func addEvent(name: String, location: String, date: NSNumber) -> Void {
//    debugPrint(name, date, location)
//  }
  @objc
  func simulatorNotifications() {
    let center = UNUserNotificationCenter.current()
    center.requestAuthorization(options: [.alert, .sound, .badge]) { granted, error in
        
        if let error = error {
            // Handle the error here.
        }
        
        // Enable or disable features based on the authorization.
    }
  }
  
  @objc
  func start() {
    LocationManager.shared.startMonitoringSignificantLocationChanges()
  }
  
  @objc
  func stop() {
    LocationManager.shared.stopMonitoringSignificantLocationChanges()
  }
  
  private var count = 0
  @objc
  func increment() {
    count += 1
    print("count is \(count)")
  }
  
  @objc
  func decrement(
    _ resolve: RCTPromiseResolveBlock,
    rejecter reject: RCTPromiseRejectBlock
  ) -> Void {
    if (count == 0) {
      let error = NSError(domain: "", code: 200, userInfo: nil)
      reject("E_COUNT", "count cannot be negative", error)
    } else {
      count -= 1
      resolve("count was decremented")
    }
  }
  
}
