/**
 * Copyright 2016 Google Inc. All Rights Reserved.
 * <p>
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * <p>
 * http://www.apache.org/licenses/LICENSE-2.0
 * <p>
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

package uk.cuppazee.paper;

import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.app.PendingIntent;
import android.content.Context;
import android.content.Intent;
import android.graphics.Bitmap;
import android.location.Address;
import android.location.Geocoder;
import android.media.RingtoneManager;
import android.net.Uri;
import android.os.Build;
import androidx.core.app.NotificationCompat;

import android.util.JsonReader;
import android.util.Log;

import com.google.firebase.messaging.FirebaseMessagingService;
import com.google.firebase.messaging.RemoteMessage;
import com.squareup.picasso.Picasso;

import org.json.JSONException;
import org.json.JSONObject;

import java.io.IOException;
import java.util.Date;
import java.util.List;
import java.util.Locale;
import java.util.Map;


/**
 * NOTE: There can only be one service in each app that receives FCM messages. If multiple
 * are declared in the Manifest then the first one will be chosen.
 *
 * In order to make this Java sample functional, you must remove the following from the Kotlin messaging
 * service in the AndroidManifest.xml:
 *
 * <intent-filter>
 *   <action android:name="com.google.firebase.MESSAGING_EVENT" />
 * </intent-filter>
 */
public class NotificationHandlerService extends FirebaseMessagingService {

    private static final String TAG = "NotifHandlerService";

    @Override
    public void onMessageReceived(RemoteMessage remoteMessage) {
        Log.d(TAG, "From: " + remoteMessage.getFrom());

        // Check if message contains a data payload.
        if (remoteMessage.getData().size() > 0) {
            Log.d(TAG, "Message data payload: " + remoteMessage.getData());

            try {
                JSONObject body = new JSONObject(remoteMessage.getData().get("body"));

                if (body.has("type") && body.getString("type").equals("bouncer")) {
                    sendBouncerNotification(body);
                }
            } catch(JSONException e) {
                Log.e(TAG, e.toString());
            }
        }

        // Check if message contains a notification payload.
        if (remoteMessage.getNotification() != null) {
            Log.d(TAG, "Message Notification Body: " + remoteMessage.getNotification().getBody());
        }
    }

    private void sendBouncerNotification(JSONObject data) {
        try {
            Intent intent = new Intent (Intent.ACTION_VIEW);
            intent.setData (Uri.parse("uk.cuppazee.paper://" + data.getString("path")));
            PendingIntent pendingIntent = PendingIntent.getActivity(this, 0 /* Request code */, intent,
                    PendingIntent.FLAG_ONE_SHOT);

            String address = null;
            try {
                if (data.has("latitude") && data.has("longitude")) {
                    double lat = data.getDouble("latitude");
                    double lng = data.getDouble("longitude");
                    Geocoder myLocation = new Geocoder(this, Locale.getDefault());
                    List<Address> myList = myLocation.getFromLocation(lat, lng, 1);
                    Address item = myList.get(0);
                    if (item != null) {
                        address = item.getAddressLine(0);
                    }
                }
            } catch (IOException e) {
                Log.e(TAG, e.toString());
            }

            Bitmap image = null;
            try {
                if(data.has("image")) {
                    image = Picasso.get().load(data.getString("image")).get();
                }
            } catch (IOException e) {
                Log.e(TAG, e.toString());
            }

            if(image != null) Log.d("Image", image.toString());
            if(address != null) Log.d("Address", address);

            String channelId = "bouncer_alert";
            Uri defaultSoundUri = RingtoneManager.getDefaultUri(RingtoneManager.TYPE_NOTIFICATION);
            NotificationCompat.Builder notificationBuilder =
                    new NotificationCompat.Builder(this, channelId)
                            .setSmallIcon(R.drawable.notification_icon)
                            .setContentTitle(data.getString("title"))
                            .setAutoCancel(true)
                            .setSound(defaultSoundUri)
                            .setContentIntent(pendingIntent);
            if (image != null) {
                notificationBuilder.setLargeIcon(image);
            }
            String description  = data.getString("description");
            String mainLine = description.split("\n", 2)[0];

            if (address != null) {
                notificationBuilder
                        .setContentText(mainLine)
                        .setStyle(new NotificationCompat.BigTextStyle()
                                .bigText(description + "\n" + address));
            } else {
                notificationBuilder
                        .setContentText(mainLine)
                        .setStyle(new NotificationCompat.BigTextStyle()
                                .bigText(description));
            }

            NotificationManager notificationManager =
                    (NotificationManager) getSystemService(Context.NOTIFICATION_SERVICE);

            // Since android Oreo notification channel is needed.
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
                NotificationChannel channel = new NotificationChannel("bouncer_alert",
                        "Bouncer Alerts",
                        NotificationManager.IMPORTANCE_DEFAULT);
                notificationManager.createNotificationChannel(channel);
            }

            int m = (int) ((new Date().getTime() / 1000L) % Integer.MAX_VALUE);
            notificationManager.notify(m, notificationBuilder.build());
        } catch(JSONException e) {
            Log.e(TAG, e.toString());
        }
    }
}