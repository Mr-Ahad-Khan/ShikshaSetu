package com.yourcompany.shikshasetu;

import android.os.Bundle;
import android.view.View;
import android.webkit.WebView;

import com.getcapacitor.BridgeActivity;

public class MainActivity extends BridgeActivity {
    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        lockHorizontalOverscroll();
    }

    @Override
    public void onStart() {
        super.onStart();
        lockHorizontalOverscroll();
    }

    private void lockHorizontalOverscroll() {
        if (getBridge() == null) return;
        WebView webView = getBridge().getWebView();
        if (webView == null) return;
        webView.setOverScrollMode(View.OVER_SCROLL_NEVER);
        webView.setHorizontalScrollBarEnabled(false);
    }
}
