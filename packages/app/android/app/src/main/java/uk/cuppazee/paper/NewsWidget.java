package uk.cuppazee.paper;

import android.app.PendingIntent;
import android.appwidget.AppWidgetManager;
import android.appwidget.AppWidgetProvider;
import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.net.Uri;
import android.os.Bundle;
import android.view.View;
import android.widget.RemoteViews;

import com.android.volley.DefaultRetryPolicy;
import com.android.volley.Request;
import com.android.volley.RequestQueue;
import com.android.volley.Response;
import com.android.volley.TimeoutError;
import com.android.volley.VolleyError;
import com.android.volley.toolbox.JsonObjectRequest;
import com.android.volley.toolbox.Volley;
import com.squareup.picasso.Picasso;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.text.SimpleDateFormat;
import java.util.Calendar;

import jp.wasabeef.picasso.transformations.CropCircleTransformation;

/**
 * Implementation of App Widget functionality.
 */
public class NewsWidget extends AppWidgetProvider {

    static void updateAppWidget(Context context, AppWidgetManager appWidgetManager,
                                int appWidgetId) {

        // Construct the RemoteViews object
        RemoteViews views = new RemoteViews(context.getPackageName(), R.layout.news_widget_1r);

        RequestQueue queue = Volley.newRequestQueue(context);
        String url = "https://server.beta.cuppazee.app/widget/news";

        JsonObjectRequest jsonObjectRequest = new JsonObjectRequest
                (Request.Method.GET, url, null, response -> {
                    try {
                        JSONArray data = response.getJSONArray("data");
                        JSONObject news_a = data.getJSONObject(0);
                        JSONObject news_b = data.getJSONObject(1);

                        // Entry A
                        views.setViewVisibility(R.id.news_widget_image_a, View.VISIBLE);
                        Picasso.get().load(news_a.getString("image_url")).into(views, R.id.news_widget_image_a, new int[] {appWidgetId});
                        views.setTextViewText(R.id.news_widget_text_a, news_a.getString("title"));
                        // OnClick
                        Intent intent_a = new Intent(Intent.ACTION_VIEW, Uri.parse(news_a.getString("blog_url")));
                        PendingIntent pendingIntent_a = PendingIntent.getActivity(context, 0, intent_a, 0);
                        views.setOnClickPendingIntent(R.id.news_widget_a, pendingIntent_a);

                        // Entry B
                        views.setViewVisibility(R.id.news_widget_image_b, View.VISIBLE);
                        Picasso.get().load(news_b.getString("image_url")).into(views, R.id.news_widget_image_b, new int[] {appWidgetId});
                        views.setTextViewText(R.id.news_widget_text_b, news_b.getString("title"));
                        // OnClick
                        Intent intent_b = new Intent(Intent.ACTION_VIEW, Uri.parse(news_b.getString("blog_url")));
                        PendingIntent pendingIntent_b = PendingIntent.getActivity(context, 0, intent_b, 0);
                        views.setOnClickPendingIntent(R.id.news_widget_b, pendingIntent_b);

                        appWidgetManager.updateAppWidget(appWidgetId, views);
                    } catch (JSONException e) {
                        views.setViewVisibility(R.id.news_widget_image_a, View.INVISIBLE);
                        views.setViewVisibility(R.id.news_widget_image_b, View.INVISIBLE);
                        views.setTextViewText(R.id.news_widget_text_a, "JSON Error");
                        views.setTextViewText(R.id.news_widget_text_b, "Please report this to CuppaZee: " + e.toString());
                        appWidgetManager.updateAppWidget(appWidgetId, views);
                    }
                }, error -> {
                    if(error instanceof TimeoutError) {
                        views.setViewVisibility(R.id.news_widget_image_a, View.INVISIBLE);
                        views.setViewVisibility(R.id.news_widget_image_b, View.INVISIBLE);
                        views.setTextViewText(R.id.news_widget_text_a, "Failed to Load Data");
                        views.setTextViewText(R.id.news_widget_text_b, "Request Timed Out");
                        appWidgetManager.updateAppWidget(appWidgetId, views);
                    } else {
                        views.setViewVisibility(R.id.news_widget_image_a, View.INVISIBLE);
                        views.setViewVisibility(R.id.news_widget_image_b, View.INVISIBLE);
                        views.setTextViewText(R.id.news_widget_text_a, "Volley Error");
                        views.setTextViewText(R.id.news_widget_text_b, "Please report this to CuppaZee: " + error.toString());
                        appWidgetManager.updateAppWidget(appWidgetId, views);
                    }
                });
        jsonObjectRequest.setRetryPolicy(new DefaultRetryPolicy(15000, 2, 2));

        queue.add(jsonObjectRequest);
    }

    @Override
    public void onUpdate(Context context, AppWidgetManager appWidgetManager, int[] appWidgetIds) {
        // There may be multiple widgets active, so update all of them
        for (int appWidgetId : appWidgetIds) {
            updateAppWidget(context, appWidgetManager, appWidgetId);
        }
    }
    @Override
    public void onDeleted(Context context, int[] appWidgetIds) {
        // When the user deletes the widget, delete the preference associated with it.
    }

    @Override
    public void onEnabled(Context context) {
        // Enter relevant functionality for when the first widget is created
    }

    @Override
    public void onDisabled(Context context) {
        // Enter relevant functionality for when the last widget is disabled
    }
}

