use std::fmt::Display;

use sqlx::types::chrono;

enum TerminalColor {
    Red,
    Green,
    Yellow,
    Blue,
    Magenta,
    Cyan,
    White,
    Black,
    Reset,
}

impl Display for TerminalColor {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        let color = match self {
            TerminalColor::Red => "\x1b[31m",
            TerminalColor::Green => "\x1b[32m",
            TerminalColor::Yellow => "\x1b[33m",
            TerminalColor::Blue => "\x1b[34m",
            TerminalColor::Magenta => "\x1b[35m",
            TerminalColor::Cyan => "\x1b[36m",
            TerminalColor::White => "\x1b[37m",
            TerminalColor::Black => "\x1b[30m",
            TerminalColor::Reset => "\x1b[0m",
        };
        write!(f, "{}", color)
    }
}

impl TerminalColor {
    fn colorize(&self, message: &str) -> String {
        format!("{}{}{}", self, message, TerminalColor::Reset)
    }
}

#[derive(Debug, Clone)]
enum LogLevel {
    Error,
    Warn,
    Info,
}

impl Display for LogLevel {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        let level = match self {
            LogLevel::Error => "Error",
            LogLevel::Warn => "Warn",
            LogLevel::Info => "Info",
        };
        write!(f, "{}", level)
    }
}

pub struct Logger;

impl Logger {
    pub fn new() -> Self {
        Self {}
    }

    fn message_builder(&self, level: LogLevel, message: &str) -> String {
        let current_time = chrono::Local::now().format("%Y-%m-%d %H:%M:%S");
        let level_color = match level {
            LogLevel::Error => TerminalColor::Red,
            LogLevel::Warn => TerminalColor::Yellow,
            LogLevel::Info => TerminalColor::Green,
        };
        let message_color = match level {
            LogLevel::Error => TerminalColor::Red,
            LogLevel::Warn => TerminalColor::Yellow,
            LogLevel::Info => TerminalColor::White,
        };

        format!(
            "[{}], {}: {}",
            level_color.colorize(level.to_string().as_str()),
            current_time,
            message_color.colorize(message)
        )
    }

    pub fn error(&self, message: &str) {
        let message = self.message_builder(LogLevel::Error, message);
        println!("{}", message);
    }
    pub fn warn(&self, message: &str) {
        let message = self.message_builder(LogLevel::Warn, message);
        println!("{}", message);
    }
    pub fn info(&self, message: &str) {
        let message = self.message_builder(LogLevel::Info, message);
        println!("{}", message);
    }
}
