package uk.cuppazee.paper;

import android.app.PendingIntent;
import android.appwidget.AppWidgetManager;
import android.appwidget.AppWidgetProvider;
import android.content.Context;
import android.content.Intent;
import android.net.Uri;
import android.os.Bundle;
import android.transition.Visibility;
import android.view.View;
import android.widget.RemoteViews;

import android.content.SharedPreferences;

import com.android.volley.Request;
import com.android.volley.RequestQueue;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.toolbox.JsonObjectRequest;
import com.android.volley.toolbox.Volley;
import com.squareup.picasso.Picasso;

import org.json.JSONException;
import org.json.JSONObject;

import java.text.SimpleDateFormat;
import java.util.Calendar;

import jp.wasabeef.picasso.transformations.CropCircleTransformation;

/**
 * Implementation of App Widget functionality.
 */
public class ActivityWidget extends AppWidgetProvider {

    static void updateAppWidget(Context context, AppWidgetManager appWidgetManager,
                                int appWidgetId) {

        try {
            // Get Layout
            Bundle options = appWidgetManager.getAppWidgetOptions(appWidgetId);
            int minWidth = options.getInt(AppWidgetManager.OPTION_APPWIDGET_MIN_WIDTH);
            int minHeight = options.getInt(AppWidgetManager.OPTION_APPWIDGET_MIN_HEIGHT);

            SharedPreferences sharedPref = context.getSharedPreferences("CUPPAZEE_SHARED_STORAGE", Context.MODE_PRIVATE);
            String appString = sharedPref.getString("activity_widget_settings", "{}");
            JSONObject appData = new JSONObject(appString);

            // Construct the RemoteViews object
            RemoteViews views = getRemoteViews(context, minWidth, minHeight);


            String username = appData.optString(String.valueOf(appWidgetId), "Tap to Setup");
            Calendar calendar = Calendar.getInstance();
            SimpleDateFormat formatter = new SimpleDateFormat("HH:mm");

            if(username == "Tap to Setup") {
                views.setViewVisibility(R.id.activity_widget_image_avatar, 0);
                views.setTextViewText(R.id.activity_widget_text_daily_points, username);
                views.setTextViewText(R.id.activity_widget_text_username, "");
                views.setTextViewText(R.id.activity_widget_text_captures, "");
                views.setTextViewText(R.id.activity_widget_text_deploys, "");
                views.setTextViewText(R.id.activity_widget_text_capon, "");
                views.setTextViewText(R.id.activity_widget_text_total_points, "");
                views.setTextViewText(R.id.activity_widget_text_time, formatter.format(calendar.getTime()));
                Intent intent = new Intent(Intent.ACTION_VIEW, Uri.parse("uk.cuppazee.paper://tools/widget_configure_activity_widget/" + appWidgetId));
                PendingIntent pendingIntent = PendingIntent.getActivity(context, 0, intent, 0);
                views.setOnClickPendingIntent(R.id.activity_widget, pendingIntent);
                appWidgetManager.updateAppWidget(appWidgetId, views);
            } else {
                RequestQueue queue = Volley.newRequestQueue(context);
                String url = "https://server.beta.cuppazee.app/widget/activity?username=" + Uri.encode(username);

                JsonObjectRequest jsonObjectRequest = new JsonObjectRequest
                        (Request.Method.GET, url, null, new Response.Listener<JSONObject>() {
                            @Override
                            public void onResponse(JSONObject response) {
                                try {
                                    JSONObject data = response.getJSONObject("data");
                                    views.setViewVisibility(R.id.activity_widget_image_avatar, View.VISIBLE);
                                    Picasso.get().load("https://munzee.global.ssl.fastly.net/images/avatars/ua" + Integer.toString(data.getInt("user_id"), 36) + ".png").transform(new CropCircleTransformation()).into(views, R.id.activity_widget_image_avatar, new int[] {appWidgetId});
                                    views.setTextViewText(R.id.activity_widget_text_daily_points, data.getInt("daily_points") + " Pts");
                                    views.setTextViewText(R.id.activity_widget_text_username, data.getString("username"));
                                    views.setTextViewText(R.id.activity_widget_text_captures, data.getInt("capture_count") + " Caps  (" + data.getInt("capture_points") + " Pts)");
                                    views.setTextViewText(R.id.activity_widget_text_deploys, data.getInt("deploy_count") + " Deps  (" + data.getInt("deploy_points") + " Pts)");
                                    views.setTextViewText(R.id.activity_widget_text_capon, data.getInt("capon_count") + " Capons  (" + data.getInt("capon_points") + " Pts)");
                                    views.setTextViewText(R.id.activity_widget_text_total_points, data.getInt("total_points") + " Pts");
                                    views.setTextViewText(R.id.activity_widget_text_time, formatter.format(calendar.getTime()));
                                    Intent intent = new Intent(Intent.ACTION_VIEW, Uri.parse("uk.cuppazee.paper://user/" + data.getString("username") + "/activity"));
                                    PendingIntent pendingIntent = PendingIntent.getActivity(context, 0, intent, 0);
                                    views.setOnClickPendingIntent(R.id.activity_widget, pendingIntent);
                                    appWidgetManager.updateAppWidget(appWidgetId, views);
                                } catch (JSONException e) {
                                    views.setViewVisibility(R.id.activity_widget_image_avatar, View.INVISIBLE);
                                    views.setTextViewText(R.id.activity_widget_text_daily_points, e.toString());
                                    views.setTextViewText(R.id.activity_widget_text_username, "");
                                    views.setTextViewText(R.id.activity_widget_text_captures, "");
                                    views.setTextViewText(R.id.activity_widget_text_deploys, "");
                                    views.setTextViewText(R.id.activity_widget_text_capon, "");
                                    views.setTextViewText(R.id.activity_widget_text_total_points, "");
                                    views.setTextViewText(R.id.activity_widget_text_time, formatter.format(calendar.getTime()));
                                    appWidgetManager.updateAppWidget(appWidgetId, views);
                                }
                            }
                        }, new Response.ErrorListener() {
                            @Override
                            public void onErrorResponse(VolleyError error) {
                                views.setViewVisibility(R.id.activity_widget_image_avatar, View.INVISIBLE);
                                views.setTextViewText(R.id.activity_widget_text_daily_points, "Error");
                                views.setTextViewText(R.id.activity_widget_text_username, "");
                                views.setTextViewText(R.id.activity_widget_text_captures, "");
                                views.setTextViewText(R.id.activity_widget_text_deploys, "");
                                views.setTextViewText(R.id.activity_widget_text_capon, "");
                                views.setTextViewText(R.id.activity_widget_text_total_points, "");
                                views.setTextViewText(R.id.activity_widget_text_time, formatter.format(calendar.getTime()));
                                appWidgetManager.updateAppWidget(appWidgetId, views);
                            }
                        });

                queue.add(jsonObjectRequest);
            }
        }catch (JSONException e) {
            e.printStackTrace();
        }
    }

    @Override
    public void onUpdate(Context context, AppWidgetManager appWidgetManager, int[] appWidgetIds) {
        // There may be multiple widgets active, so update all of them
        for (int appWidgetId : appWidgetIds) {
            updateAppWidget(context, appWidgetManager, appWidgetId);
        }
    }

    @Override
    public void onAppWidgetOptionsChanged(Context context, AppWidgetManager appWidgetManager, int appWidgetId, Bundle newOptions) {
        updateAppWidget(context, appWidgetManager, appWidgetId);
        super.onAppWidgetOptionsChanged(context, appWidgetManager, appWidgetId, newOptions);
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

    private static RemoteViews getRemoteViews(Context context, int minWidth, int minHeight) {
        // First find out rows and columns based on width provided.
        int rows = getCellsForSize(minHeight);
        int columns = getCellsForSize(minWidth);
        // Now you changing layout base on you column count
        // In this code from 1 column to 4
        // you can make code for more columns on your own.
        switch (columns) {
            case 1:  return new RemoteViews(context.getPackageName(), R.layout.activity_widget_vertical);
            case 2:  return new RemoteViews(context.getPackageName(), R.layout.activity_widget_vertical);
            default: return new RemoteViews(context.getPackageName(), R.layout.activity_widget);
        }
    }

    private static int getCellsForSize(int size) {
        int n = 2;
        while (70 * n - 30 < size) {
            ++n;
        }
        return n - 1;
    }
}

