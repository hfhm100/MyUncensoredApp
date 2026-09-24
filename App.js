import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, ActivityIndicator, ScrollView } from 'react-native';

export default function App() {
  const [prompt, setPrompt] = useState('');
  const [apiUrl, setApiUrl] = useState('');
  const [imageUri, setImageUri] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!apiUrl || !prompt) return alert("أدخل رابط السيرفر والأمر");
    setLoading(true);
    setImageUri(null);

    try {
      const response = await fetch(`${apiUrl}/generate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      });
      const data = await response.json();
      if (data.image_base64) setImageUri(data.image_base64);
    } catch (e) {
      alert("خطأ في الاتصال بالسيرفر");
    } finally {
      setLoading(false);
    }
  };

  return (
    
      تطبيق التوليد الخاص بك
      
      
      
        {loading ? "جاري المعالجة..." : "توليد الصورة"}
      
      {loading && }
      {imageUri && }
    
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, paddingTop: 60, alignItems: 'center' },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 20 },
  input: { width: '100%', borderColor: '#ccc', borderWidth: 1, borderRadius: 8, padding: 10, marginBottom: 10 },
  btn: { backgroundColor: '#007AFF', padding: 15, borderRadius: 8, width: '100%', alignItems: 'center' },
  btnText: { color: '#fff', fontWeight: 'bold' },
  img: { width: 300, height: 300, marginTop: 20, borderRadius: 8 }
});
