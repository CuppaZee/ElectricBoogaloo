package uk.cuppazee.paper;
import android.app.Activity;
import android.app.IntentService;
import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.app.PendingIntent;
import android.app.TaskStackBuilder;
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.content.IntentSender;
import android.graphics.BitmapFactory;
import android.graphics.Color;
import android.icu.text.DateFormat;
import android.location.Location;
import android.location.LocationManager;
import android.os.Build;
import android.os.Looper;
import android.preference.PreferenceManager;
import android.util.Log;

import androidx.annotation.NonNull;
import androidx.core.app.NotificationCompat;

import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.google.android.gms.common.api.ResolvableApiException;
import com.google.android.gms.location.FusedLocationProviderClient;
import com.google.android.gms.location.LocationCallback;
import com.google.android.gms.location.LocationRequest;
import com.google.android.gms.location.LocationResult;
import com.google.android.gms.location.LocationServices;
import com.google.android.gms.location.LocationSettingsRequest;
import com.google.android.gms.location.LocationSettingsResponse;
import com.google.android.gms.location.SettingsClient;
import com.google.android.gms.tasks.OnFailureListener;
import com.google.android.gms.tasks.OnSuccessListener;
import com.google.android.gms.tasks.Task;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.HashMap;

class Utils {

    final static String KEY_LOCATION_UPDATES_REQUESTED = "location-updates-requested";
    final static String KEY_EXPO_PUSH_TOKEN = "expo-push-token";

    static void setRequestingLocationUpdates(Context context, boolean value) {
        PreferenceManager.getDefaultSharedPreferences(context)
                .edit()
                .putBoolean(KEY_LOCATION_UPDATES_REQUESTED, value)
                .apply();
    }

    static boolean getRequestingLocationUpdates(Context context) {
        return PreferenceManager.getDefaultSharedPreferences(context)
                .getBoolean(KEY_LOCATION_UPDATES_REQUESTED, false);
    }

    static void setExpoPushToken(Context context, String value) {
        PreferenceManager.getDefaultSharedPreferences(context)
                .edit()
                .putString(KEY_EXPO_PUSH_TOKEN, value)
                .apply();
    }

    static String getExpoPushToken(Context context) {
        return PreferenceManager.getDefaultSharedPreferences(context)
                .getString(KEY_EXPO_PUSH_TOKEN, "");
    }
}

public class LiveLocationModule extends ReactContextBaseJavaModule {
    LiveLocationModule (ReactApplicationContext context) {
        super(context);
    }

    @Override
    public String getName() {
        return "LiveLocation";
    }

    private PendingIntent getPendingIntent() {
        Activity activity = getCurrentActivity();
        Intent intent = new Intent(activity, LocationUpdatesBroadcastReceiver.class);
        intent.setAction(LocationUpdatesBroadcastReceiver.ACTION_PROCESS_UPDATES);
        return PendingIntent.getBroadcast(activity, 0, intent, PendingIntent.FLAG_UPDATE_CURRENT);
    }

    @ReactMethod
    public void getLocationUpdatesStatus(Promise promise) {
        Activity activity = getCurrentActivity();
        promise.resolve(Utils.getRequestingLocationUpdates(activity));
    }

    @ReactMethod
    public void stopLocationUpdates(Promise promise) {
        Activity activity = getCurrentActivity();
        FusedLocationProviderClient fusedLocationClient = LocationServices.getFusedLocationProviderClient(activity);
        Log.i("LiveLocationModule", "Removing location updates");
        Utils.setRequestingLocationUpdates(activity, false);
        fusedLocationClient.removeLocationUpdates(getPendingIntent());
        promise.resolve(true);
    }

    @ReactMethod void setExpoPushToken(String token) {
        Utils.setExpoPushToken(getCurrentActivity(), token);
    }

    @ReactMethod
    public void startLocationUpdates(double interval, double fastestInterval, double maxWaitTime, Promise promise) {
        Activity activity = getCurrentActivity();
        if(activity == null) {
            promise.reject("MissingActivity", "Activity Context Missing");
        };
        LocationRequest locationRequest = LocationRequest.create();
        locationRequest.setInterval((long)interval);
        locationRequest.setFastestInterval((long)fastestInterval);
        locationRequest.setPriority(LocationRequest.PRIORITY_HIGH_ACCURACY);
//        locationRequest.setPriority(LocationRequest.PRIORITY_BALANCED_POWER_ACCURACY);
        locationRequest.setMaxWaitTime((long)maxWaitTime);

        LocationSettingsRequest.Builder builder = new LocationSettingsRequest.Builder()
                .addLocationRequest(locationRequest);

        SettingsClient client = LocationServices.getSettingsClient(activity);
        Task<LocationSettingsResponse> task = client.checkLocationSettings(builder.build());

        task.addOnSuccessListener(activity, locationSettingsResponse -> {
            FusedLocationProviderClient fusedLocationClient = LocationServices.getFusedLocationProviderClient(activity);
            try {
                Log.i("LiveLocationModule", "Starting location updates");
                Utils.setRequestingLocationUpdates(activity, true);
                fusedLocationClient.requestLocationUpdates(locationRequest, getPendingIntent());
                promise.resolve(true);
            } catch (SecurityException e) {
                Utils.setRequestingLocationUpdates(activity, false);
                e.printStackTrace();
                promise.reject("StartLocationUpdatesError", "Could not start Location Updates");
            }
        });

        task.addOnFailureListener(activity, e -> {
            promise.reject("CheckLocationSettingsError", "Location Settings were not correct");
        });
    }
}