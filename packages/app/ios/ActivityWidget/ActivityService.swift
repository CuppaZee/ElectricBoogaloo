//
//  NewsService.swift
//  NewsWidgetExtension
//
//  Created by user924093 on 1/29/21.
//

import Foundation
import SwiftUI

struct ActivityData: Codable {
  let username: String
  let user_id: Int
  let time: Int
  let capture_count: Int
  let capture_points: Int
  let deploy_count: Int
  let deploy_points: Int
  let capon_count: Int
  let capon_points: Int
  let daily_points: Int
  let total_points: Int
}

struct ActivityResponse: Codable {
    let data: ActivityData
}

class ActivityService {
  func getActivity(url: URL, completion: @escaping (Result<ActivityData, Error>) -> Void) {
        URLSession.shared.dataTask(with: url) { data, response, error in
            guard error == nil else {
                completion(.failure(error!))
                return
            }
            
            completion(.success(self.getActivityResponse(fromData: data!)))
        }.resume()
    }
    
    
    private func getActivityResponse(fromData data: Data) -> ActivityData {
        let newsData = try? JSONDecoder().decode(ActivityResponse.self, from: data)
        if let newsD = newsData {
            return newsD.data
        }
      return ActivityData(username: "Error", user_id: 0, time: 0, capture_count: 0, capture_points: 0, deploy_count: 0, deploy_points: 0, capon_count: 0, capon_points: 0, daily_points: 0, total_points: 0)
    }
}
