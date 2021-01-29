//
//  ActivityWidget.swift
//  ActivityWidget
//
//  Created by user924093 on 1/29/21.
//

import WidgetKit
import SwiftUI
import Intents
struct Provider: IntentTimelineProvider {
    func placeholder(in context: Context) -> SimpleEntry {
      SimpleEntry(date: Date(), activity: ActivityData(username: "Placeholder", user_id: 0, time: 0, capture_count: 0, capture_points: 0, deploy_count: 0, deploy_points: 0, capon_count: 0, capon_points: 0, daily_points: 0, total_points: 0), configuration: ConfigurationIntent())
    }

    func getSnapshot(for configuration: ConfigurationIntent, in context: Context, completion: @escaping (SimpleEntry) -> ()) {
      let entry = SimpleEntry(date: Date(), activity: ActivityData(username: "Placeholder", user_id: 0, time: 0, capture_count: 0, capture_points: 0, deploy_count: 0, deploy_points: 0, capon_count: 0, capon_points: 0, daily_points: 0, total_points: 0), configuration: configuration)
        completion(entry)
    }

    func getTimeline(for configuration: ConfigurationIntent, in context: Context, completion: @escaping (Timeline<Entry>) -> ()) {
          let currentDate = Date()
          let refreshDate = Calendar.current.date(byAdding: .minute, value: 15, to: currentDate)!
          
      ActivityService().getActivity(url: URL(string: "https://server.beta.cuppazee.app/widget/activity?username=\(configuration.username ?? "")")!) { (result) in
            let activity: ActivityData
              
              if case .success(let fetchedData) = result {
                  activity = fetchedData
              } else {
                  activity = ActivityData(username: "Error", user_id: 0, time: 0, capture_count: 0, capture_points: 0, deploy_count: 0, deploy_points: 0, capon_count: 0, capon_points: 0, daily_points: 0, total_points: 0)
              }
              
            let entry = SimpleEntry(date: currentDate, activity: activity, configuration: configuration)
              let timeline = Timeline(entries: [entry], policy: .after(refreshDate))
              completion(timeline)
          }
    }
}

struct SimpleEntry: TimelineEntry {
    let date: Date
    let activity: ActivityData
    let configuration: ConfigurationIntent
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

struct ActivityWidgetEntryView : View {
    var entry: Provider.Entry

    var body: some View {
      HStack(alignment:.top) {
        VStack(alignment: .leading) {
          Text("\(entry.activity.daily_points) Pts").font(Font.system(size: 24, design: .default))
          Text("\(entry.activity.capture_count) Caps (\(entry.activity.capture_points))")
          Text("\(entry.activity.deploy_count) Deps (\(entry.activity.deploy_points))")
          Text("\(entry.activity.capon_count) Capons (\(entry.activity.capon_points))")
        }
        Spacer()
        VStack(alignment: .trailing) {
          Text(entry.activity.username).font(Font.system(size: 24, design: .default))
          Text("\(entry.activity.total_points) Pts")
          Spacer()
          Text(Date(), style: .time)
        }
      }.frame(minWidth: /*@START_MENU_TOKEN@*/0/*@END_MENU_TOKEN@*/, idealWidth: 300, maxWidth: /*@START_MENU_TOKEN@*/.infinity/*@END_MENU_TOKEN@*/, minHeight: /*@START_MENU_TOKEN@*/0/*@END_MENU_TOKEN@*/, idealHeight: 300, maxHeight: /*@START_MENU_TOKEN@*/.infinity/*@END_MENU_TOKEN@*/, alignment: .leading).padding(16)
//      VStack(
//        alignment: .leading,
//        content: {
//          Link(destination: URL(string: entry.newsEntries[0].blog_url)!) {HStack(content: {
//            NetworkImage(url: URL(string: entry.newsEntries[0].image_url))
//              .frame(width: 48.0, height: 48.0)
//            Text(entry.newsEntries[0].title).lineLimit(2).padding(.leading)
//          })}
//          if(entry.newsEntries.endIndex > 0) {
//            Link(destination: URL(string: entry.newsEntries[1].blog_url)!) {HStack(content: {
//              NetworkImage(url: URL(string: entry.newsEntries[1].image_url))
//                .frame(width: 48.0, height: 48.0)
//              Text(entry.newsEntries[1].title).lineLimit(2).padding(.leading)
//            })}.padding(.top)
//          }
//
//        })
    }
}

@main
struct ActivityWidget: Widget {
    let kind: String = "ActivityWidget"

    var body: some WidgetConfiguration {
        IntentConfiguration(kind: kind, intent: ConfigurationIntent.self, provider: Provider()) { entry in
            ActivityWidgetEntryView(entry: entry)
        }
        .configurationDisplayName("Munzee Activity")
        .description("See your daily Munzee activity")
        .supportedFamilies([.systemMedium])
    }
}

struct ActivityWidget_Previews: PreviewProvider {
    static var previews: some View {
        ActivityWidgetEntryView(entry: SimpleEntry(date: Date(), activity: ActivityData(username: "Placeholder", user_id: 0, time: 0, capture_count: 0, capture_points: 0, deploy_count: 0, deploy_points: 0, capon_count: 0, capon_points: 0, daily_points: 0, total_points: 0), configuration: ConfigurationIntent()))
            .previewContext(WidgetPreviewContext(family: .systemMedium))
    }
}
