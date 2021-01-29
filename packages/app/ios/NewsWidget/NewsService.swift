//
//  NewsService.swift
//  NewsWidgetExtension
//
//  Created by user924093 on 1/29/21.
//

import Foundation
import SwiftUI

struct NewsEntry: Codable {
  let id: String
  let show_at: String
  let title: String
  let image_url: String
  let blog_url: String
}

struct NewsResponse: Codable {
    let data: [NewsEntry]
}

class NewsService {
    let url = URL(string: "https://server.beta.cuppazee.app/widget/news")!
    
    func getNews(completion: @escaping (Result<[NewsEntry], Error>) -> Void) {
        URLSession.shared.dataTask(with: url) { data, response, error in
            guard error == nil else {
                completion(.failure(error!))
                return
            }
            
            completion(.success(self.getNewsResponse(fromData: data!)))
        }.resume()
    }
    
    
    private func getNewsResponse(fromData data: Data) -> [NewsEntry] {
        let newsData = try? JSONDecoder().decode(NewsResponse.self, from: data)
        if let newsD = newsData {
            return newsD.data
        }
      return [NewsEntry(id: "err", show_at: "", title: "Error", image_url: "https://server.beta.cuppazee.app/missing.png", blog_url: "https://server.beta.cuppazee.app/missing.png")]
    }
}
