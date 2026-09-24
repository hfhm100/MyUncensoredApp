import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, ActivityIndicator, ScrollView } from 'react-native';

export default function App() {
  const [apiUrl, setApiUrl] = useState('https://phoney-culprit-pediatric.ngrok-free.dev');
  const [prompt, setPrompt] = useState('');
  const [imageUri, setImageUri] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!prompt) return alert('برجاء كتابة وصف للصورة أولاً');
    if (!apiUrl) return alert('برجاء إدخال رابط السيرفر');

    setLoading(true);
    setImageUri(null);

    try {
      // إزالة / الزائدة إن وجدت وتشكيل رابط POST النهائي
      const cleanUrl = apiUrl.replace(/\/$/, '');
      const response = await fetch(`${cleanUrl}/generate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'ngrok-skip-browser-warning': 'true',
        },
        body: JSON.stringify({ prompt: prompt }),
      });

      const data = await response.json();
      if (data.image_base64) {
        setImageUri(data.image_base64);
      } else {
        alert('حدث خطأ في السيرفر أثناء إنشاء الصورة');
      }
    } catch (error) {
      alert('فشل الاتصال بالسيرفر: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    
      توليد الصور بالذكاء الاصطناعي

      رابط السيرفر (Ngrok URL):
      

      وصف الصورة (Prompt):
      

      
        {loading ? 'جاري التوليد...' : 'توليد الصورة'}
      

      {loading && }

      {imageUri && (
        
      )}
    
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    paddingTop: 60,
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  label: {
    alignSelf: 'flex-start',
    fontWeight: '600',
    marginBottom: 5,
    marginTop: 10,
  },
  input: {
    width: '100%',
    height: 45,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    backgroundColor: '#fff',
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  image: {
    width: 300,
    height: 300,
    marginTop: 25,
    borderRadius: 10,
  },
});
