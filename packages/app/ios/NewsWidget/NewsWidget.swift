//
//  NewsWidget.swift
//  NewsWidget
//
//  Created by user924093 on 1/29/21.
//

import WidgetKit
import SwiftUI
import Intents

struct Provider: IntentTimelineProvider {
  typealias Entry = SimpleEntry
  
  typealias Intent = NewsConfigurationIntent
  
    func placeholder(in context: Context) -> SimpleEntry {
        SimpleEntry(date: Date(), newsEntries: [NewsEntry(id: "placeholder", show_at: "", title: "February 2021 Clan Wars Requirements", image_url: "https://munzeeblog-new.s3.amazonaws.com/uploads/2021/01/CW_Feb_2021_Level_1_1024.png", blog_url: "https://www.munzeeblog.com/february-2021-clan-wars-requirements/")], configuration: NewsConfigurationIntent())
    }

    func getSnapshot(for configuration: NewsConfigurationIntent, in context: Context, completion: @escaping (SimpleEntry) -> ()) {
        let entry = SimpleEntry(date: Date(), newsEntries: [NewsEntry(id: "placeholder", show_at: "", title: "February 2021 Clan Wars Requirements", image_url: "https://munzeeblog-new.s3.amazonaws.com/uploads/2021/01/CW_Feb_2021_Level_1_1024.png", blog_url: "https://www.munzeeblog.com/february-2021-clan-wars-requirements/")], configuration: configuration)
        completion(entry)
    }

    func getTimeline(for configuration: NewsConfigurationIntent, in context: Context, completion: @escaping (Timeline<Entry>) -> ()) {
          let currentDate = Date()
          let refreshDate = Calendar.current.date(byAdding: .minute, value: 15, to: currentDate)!
          
          NewsService().getNews { (result) in
              let newsInfo: [NewsEntry]
              
              if case .success(let fetchedData) = result {
                  newsInfo = fetchedData
              } else {
                  newsInfo = [NewsEntry(id: "err", show_at: "", title: "Error", image_url: "https://server.cuppazee.app/missing.png", blog_url: "https://server.cuppazee.app/missing.png")]
              }
              
            let entry = SimpleEntry(date: currentDate, newsEntries: newsInfo, configuration: configuration)
              let timeline = Timeline(entries: [entry], policy: .after(refreshDate))
              completion(timeline)
          }
    }
}

struct SimpleEntry: TimelineEntry {
    let date: Date
    let newsEntries: [NewsEntry]
    let configuration: NewsConfigurationIntent
}

struct NetworkImage: View {

  let url: URL?

  var body: some View {

    Group {
     if let url = url, let imageData = try? Data(contentsOf: url),
       let uiImage = UIImage(data: imageData) {

       Image(uiImage: uiImage)
         .resizable()
         .aspectRatio(contentMode: .fill)
      }
      else {
       Image("placeholder-image")
      }
    }
  }

}

struct NewsWidgetEntryView : View {
    var entry: Provider.Entry

    var body: some View {
      VStack(
        alignment: .leading,
        content: {
          Link(destination: URL(string: entry.newsEntries[0].blog_url)!) {HStack(content: {
            NetworkImage(url: URL(string: entry.newsEntries[0].image_url))
              .frame(width: 48.0, height: 48.0)
            Text(entry.newsEntries[0].title).lineLimit(2).padding(.leading)
          })}
          if(entry.newsEntries.endIndex > 0) {
            Link(destination: URL(string: entry.newsEntries[1].blog_url)!) {HStack(content: {
              NetworkImage(url: URL(string: entry.newsEntries[1].image_url))
                .frame(width: 48.0, height: 48.0)
              Text(entry.newsEntries[1].title).lineLimit(2).padding(.leading)
            })}.padding(.top)
          }
          
        }).frame(minWidth: /*@START_MENU_TOKEN@*/0/*@END_MENU_TOKEN@*/, idealWidth: 300, maxWidth: /*@START_MENU_TOKEN@*/.infinity/*@END_MENU_TOKEN@*/, minHeight: /*@START_MENU_TOKEN@*/0/*@END_MENU_TOKEN@*/, idealHeight: 300, maxHeight: /*@START_MENU_TOKEN@*/.infinity/*@END_MENU_TOKEN@*/, alignment: .leading).padding(16)
    }
}

@main
struct NewsWidget: Widget {
    let kind: String = "NewsWidget"

    var body: some WidgetConfiguration {
        IntentConfiguration(kind: kind, intent: NewsConfigurationIntent.self, provider: Provider()) { entry in
            NewsWidgetEntryView(entry: entry)
        }
        .configurationDisplayName("Munzee News")
        .description("See the latest news from Munzee")
        .supportedFamilies([.systemMedium])
    }
}

struct NewsWidget_Previews: PreviewProvider {
    static var previews: some View {
        NewsWidgetEntryView(entry: SimpleEntry(date: Date(), newsEntries: [NewsEntry(id: "placeholder", show_at: "", title: "February 2021 Clan Wars Requirements", image_url: "https://munzeeblog-new.s3.amazonaws.com/uploads/2021/01/CW_Feb_2021_Level_1_1024.png", blog_url: "https://www.munzeeblog.com/february-2021-clan-wars-requirements/")], configuration: NewsConfigurationIntent()))
            .previewContext(WidgetPreviewContext(family: .systemMedium))
    }
}
